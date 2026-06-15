"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gmailmarket-pro:XlThtrlTelGFLCc2@cluster0.02sbr.mongodb.net/Canvo=Cluster0';
const CategorySchema = new mongoose_1.default.Schema({
    name: String,
    slug: String,
    image: String,
    description: String,
    order: Number,
    isVisible: { type: Boolean, default: true },
}, { timestamps: true });
const UserSchema = new mongoose_1.default.Schema({
    googleId: String,
    name: String,
    email: { type: String, unique: true },
    avatar: String,
    role: { type: String, enum: ['admin', 'moderator', 'user'], default: 'user' },
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
}, { timestamps: true });
const ProductSchema = new mongoose_1.default.Schema({
    name: String,
    slug: { type: String, unique: true },
    description: String,
    shortDescription: String,
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category' },
    tags: [String],
    basePrice: Number,
    discountType: { type: String, enum: ['none', 'percentage', 'flat'], default: 'none' },
    discountValue: { type: Number, default: 0 },
    variations: [{
            color: String,
            colorHex: String,
            images: [{ url: String, thumbnailUrl: String, order: Number, isDefault: Boolean }],
            sizes: [{ size: String, stock: Number, priceOverride: Number }],
        }],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    publishedAt: Date,
    ratings: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
}, { timestamps: true });
const DiscountSchema = new mongoose_1.default.Schema({
    type: String,
    code: { type: String, unique: true, sparse: true },
    title: String,
    discountType: String,
    discountValue: Number,
    minOrderAmount: { type: Number, default: 0 },
    maxDiscountAmount: Number,
    applicableTo: { type: String, default: 'all' },
    startDate: Date,
    endDate: Date,
    usageLimit: { type: Number, default: 0 },
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const FrontendContentSchema = new mongoose_1.default.Schema({
    section: { type: String, unique: true },
    data: mongoose_1.default.Schema.Types.Mixed,
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
async function seed() {
    await mongoose_1.default.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const Category = mongoose_1.default.model('Category', CategorySchema);
    const User = mongoose_1.default.model('User', UserSchema);
    const Product = mongoose_1.default.model('Product', ProductSchema);
    const Discount = mongoose_1.default.model('Discount', DiscountSchema);
    const FrontendContent = mongoose_1.default.model('FrontendContent', FrontendContentSchema);
    await User.deleteMany({});
    const admin = await User.create({
        googleId: 'placeholder-admin-google-id',
        name: 'CANVO Admin',
        email: 'admin@canvo.com.bd',
        avatar: '',
        role: 'admin',
        lastLogin: new Date(),
    });
    console.log('✓ Admin user seeded');
    await Category.deleteMany({});
    const categories = await Category.insertMany([
        { name: 'Footwear / Juta', slug: 'juta-footwear', description: 'Premium footwear collection', order: 1 },
        { name: 'Panjabi', slug: 'panjabi', description: 'Traditional panjabi collection', order: 2 },
        { name: 'Shirt', slug: 'shirt', description: 'Formal & casual shirts', order: 3 },
        { name: 'T-Shirt', slug: 't-shirt', description: 'Casual t-shirts', order: 4 },
        { name: 'Pant', slug: 'pant', description: 'Trousers & pants', order: 5 },
        { name: 'Bag', slug: 'bag', description: 'Bags & accessories', order: 6 },
        { name: 'Accessories', slug: 'accessories', description: 'Fashion accessories', order: 7 },
    ]);
    console.log('✓ 7 categories seeded');
    await Product.deleteMany({});
    const productData = [
        {
            name: 'Premium Leather Casual Shoe',
            slug: 'premium-leather-casual-shoe',
            description: 'Handcrafted premium leather casual shoes for men. Perfect for both formal and casual occasions.',
            shortDescription: 'Premium leather casual shoes',
            category: categories[0]._id,
            tags: ['footwear', 'leather', 'casual'],
            basePrice: 2499,
            discountType: 'percentage',
            discountValue: 10,
            isFeatured: true,
            isNewArrival: true,
            isBestseller: true,
            variations: [
                { color: 'Black', colorHex: '#000000', sizes: [{ size: '40', stock: 10 }, { size: '41', stock: 15 }, { size: '42', stock: 20 }, { size: '43', stock: 8 }, { size: '44', stock: 5 }] },
                { color: 'Brown', colorHex: '#8B4513', sizes: [{ size: '40', stock: 5 }, { size: '41', stock: 12 }, { size: '42', stock: 15 }, { size: '43', stock: 10 }, { size: '44', stock: 3 }] },
            ],
        },
        {
            name: 'Classic Formal Oxford Shoe',
            slug: 'classic-formal-oxford-shoe',
            description: 'Timeless Oxford design for the modern gentleman. Premium polished leather.',
            shortDescription: 'Classic formal Oxford shoes',
            category: categories[0]._id,
            tags: ['footwear', 'formal', 'oxford'],
            basePrice: 3299,
            variations: [
                { color: 'Black', colorHex: '#000000', sizes: [{ size: '39', stock: 8 }, { size: '40', stock: 15 }, { size: '41', stock: 20 }, { size: '42', stock: 12 }, { size: '43', stock: 6 }] },
                { color: 'Tan', colorHex: '#D2B48C', sizes: [{ size: '40', stock: 5 }, { size: '41', stock: 8 }, { size: '42', stock: 10 }, { size: '43', stock: 4 }] },
            ],
        },
        {
            name: 'Royal Cotton Panjabi',
            slug: 'royal-cotton-panjabi',
            description: 'Premium cotton panjabi with intricate embroidery. Perfect for Eid and special occasions.',
            shortDescription: 'Premium cotton panjabi',
            category: categories[1]._id,
            tags: ['panjabi', 'eid', 'traditional'],
            basePrice: 1899,
            discountType: 'flat',
            discountValue: 200,
            isNewArrival: true,
            variations: [
                { color: 'White', colorHex: '#FFFFFF', sizes: [{ size: 'M', stock: 20 }, { size: 'L', stock: 30 }, { size: 'XL', stock: 25 }, { size: 'XXL', stock: 15 }] },
                { color: 'Navy', colorHex: '#000080', sizes: [{ size: 'M', stock: 15 }, { size: 'L', stock: 25 }, { size: 'XL', stock: 20 }, { size: 'XXL', stock: 10 }] },
            ],
        },
        {
            name: 'Silk Blend Panjabi',
            slug: 'silk-blend-panjabi',
            description: 'Luxurious silk blend panjabi with golden thread work.',
            shortDescription: 'Luxurious silk blend panjabi',
            category: categories[1]._id,
            tags: ['panjabi', 'silk', 'luxury'],
            basePrice: 3499,
            isFeatured: true,
            variations: [
                { color: 'Burgundy', colorHex: '#800020', sizes: [{ size: 'M', stock: 10 }, { size: 'L', stock: 15 }, { size: 'XL', stock: 12 }, { size: 'XXL', stock: 5 }] },
                { color: 'Forest Green', colorHex: '#228B22', sizes: [{ size: 'L', stock: 10 }, { size: 'XL', stock: 8 }, { size: 'XXL', stock: 3 }] },
            ],
        },
        {
            name: 'Premium Cotton Formal Shirt',
            slug: 'premium-cotton-formal-shirt',
            description: '100% Egyptian cotton formal shirt. Wrinkle-resistant fabric.',
            shortDescription: 'Premium cotton formal shirt',
            category: categories[2]._id,
            tags: ['shirt', 'formal', 'cotton'],
            basePrice: 1499,
            isBestseller: true,
            variations: [
                { color: 'White', colorHex: '#FFFFFF', sizes: [{ size: 'S', stock: 20 }, { size: 'M', stock: 30 }, { size: 'L', stock: 35 }, { size: 'XL', stock: 25 }, { size: 'XXL', stock: 15 }] },
                { color: 'Light Blue', colorHex: '#ADD8E6', sizes: [{ size: 'S', stock: 15 }, { size: 'M', stock: 25 }, { size: 'L', stock: 30 }, { size: 'XL', stock: 20 }, { size: 'XXL', stock: 10 }] },
            ],
        },
        {
            name: 'Slim Fit Casual Shirt',
            slug: 'slim-fit-casual-shirt',
            description: 'Modern slim fit casual shirt. Comfortable and stylish.',
            shortDescription: 'Slim fit casual shirt',
            category: categories[2]._id,
            tags: ['shirt', 'casual', 'slim-fit'],
            basePrice: 1299,
            isNewArrival: true,
            variations: [
                { color: 'Black', colorHex: '#000000', sizes: [{ size: 'S', stock: 15 }, { size: 'M', stock: 25 }, { size: 'L', stock: 30 }, { size: 'XL', stock: 20 }] },
                { color: 'Olive', colorHex: '#556B2F', sizes: [{ size: 'M', stock: 15 }, { size: 'L', stock: 20 }, { size: 'XL', stock: 12 }] },
            ],
        },
        {
            name: 'Premium Heavyweight T-Shirt',
            slug: 'premium-heavyweight-t-shirt',
            description: '280 GSM heavyweight cotton t-shirt. Ultra-comfortable and durable.',
            shortDescription: 'Heavyweight premium t-shirt',
            category: categories[3]._id,
            tags: ['t-shirt', 'casual', 'heavyweight'],
            basePrice: 899,
            isFeatured: true,
            isBestseller: true,
            variations: [
                { color: 'Black', colorHex: '#000000', sizes: [{ size: 'S', stock: 30 }, { size: 'M', stock: 40 }, { size: 'L', stock: 45 }, { size: 'XL', stock: 35 }, { size: 'XXL', stock: 20 }] },
                { color: 'White', colorHex: '#FFFFFF', sizes: [{ size: 'S', stock: 25 }, { size: 'M', stock: 35 }, { size: 'L', stock: 40 }, { size: 'XL', stock: 30 }, { size: 'XXL', stock: 15 }] },
            ],
        },
        {
            name: 'Graphic Print Oversized T-Shirt',
            slug: 'graphic-print-oversized-t-shirt',
            description: 'Trendy oversized fit with unique graphic prints.',
            shortDescription: 'Oversized graphic t-shirt',
            category: categories[3]._id,
            tags: ['t-shirt', 'oversized', 'graphic'],
            basePrice: 1199,
            isNewArrival: true,
            variations: [
                { color: 'Burgundy', colorHex: '#800020', sizes: [{ size: 'M', stock: 20 }, { size: 'L', stock: 25 }, { size: 'XL', stock: 15 }] },
                { color: 'Grey', colorHex: '#808080', sizes: [{ size: 'M', stock: 15 }, { size: 'L', stock: 20 }, { size: 'XL', stock: 10 }] },
            ],
        },
        {
            name: 'Chino Slim Fit Pant',
            slug: 'chino-slim-fit-pant',
            description: 'Premium chino pants with modern slim fit. Comfortable stretch fabric.',
            shortDescription: 'Slim fit chino pants',
            category: categories[4]._id,
            tags: ['pant', 'chino', 'slim-fit'],
            basePrice: 1799,
            discountType: 'percentage',
            discountValue: 15,
            isBestseller: true,
            variations: [
                { color: 'Khaki', colorHex: '#C3B091', sizes: [{ size: '28', stock: 10 }, { size: '30', stock: 20 }, { size: '32', stock: 25 }, { size: '34', stock: 15 }, { size: '36', stock: 8 }] },
                { color: 'Navy', colorHex: '#000080', sizes: [{ size: '28', stock: 8 }, { size: '30', stock: 15 }, { size: '32', stock: 20 }, { size: '34', stock: 12 }] },
            ],
        },
        {
            name: 'Cargo Jogger Pant',
            slug: 'cargo-jogger-pant',
            description: 'Stylish cargo joggers with multiple pockets. Elastic waistband.',
            shortDescription: 'Cargo jogger pants',
            category: categories[4]._id,
            tags: ['pant', 'cargo', 'jogger'],
            basePrice: 1399,
            isNewArrival: true,
            variations: [
                { color: 'Black', colorHex: '#000000', sizes: [{ size: 'M', stock: 20 }, { size: 'L', stock: 25 }, { size: 'XL', stock: 15 }] },
                { color: 'Army Green', colorHex: '#4B5320', sizes: [{ size: 'M', stock: 15 }, { size: 'L', stock: 20 }, { size: 'XL', stock: 10 }] },
            ],
        },
        {
            name: 'Leather Messenger Bag',
            slug: 'leather-messenger-bag',
            description: 'Genuine leather messenger bag. Fits 15-inch laptop.',
            shortDescription: 'Genuine leather messenger bag',
            category: categories[5]._id,
            tags: ['bag', 'leather', 'messenger'],
            basePrice: 2999,
            isFeatured: true,
            variations: [
                { color: 'Brown', colorHex: '#8B4513', sizes: [{ size: 'One Size', stock: 15 }] },
                { color: 'Black', colorHex: '#000000', sizes: [{ size: 'One Size', stock: 20 }] },
            ],
        },
        {
            name: 'Canvas Backpack',
            slug: 'canvas-backpack',
            description: 'Durable canvas backpack with padded laptop compartment.',
            shortDescription: 'Durable canvas backpack',
            category: categories[5]._id,
            tags: ['bag', 'canvas', 'backpack'],
            basePrice: 1999,
            isNewArrival: true,
            variations: [
                { color: 'Grey', colorHex: '#808080', sizes: [{ size: 'One Size', stock: 25 }] },
                { color: 'Navy', colorHex: '#000080', sizes: [{ size: 'One Size', stock: 20 }] },
            ],
        },
        {
            name: 'Leather Belt',
            slug: 'leather-belt',
            description: 'Premium genuine leather belt with brass buckle.',
            shortDescription: 'Genuine leather belt',
            category: categories[6]._id,
            tags: ['accessories', 'belt', 'leather'],
            basePrice: 699,
            variations: [
                { color: 'Black', colorHex: '#000000', sizes: [{ size: '32', stock: 30 }, { size: '34', stock: 35 }, { size: '36', stock: 25 }, { size: '38', stock: 15 }] },
                { color: 'Brown', colorHex: '#8B4513', sizes: [{ size: '32', stock: 20 }, { size: '34', stock: 25 }, { size: '36', stock: 20 }, { size: '38', stock: 10 }] },
            ],
        },
        {
            name: 'Silver Chain Necklace',
            slug: 'silver-chain-necklace',
            description: 'Premium silver-tone chain necklace. Modern design.',
            shortDescription: 'Silver tone chain necklace',
            category: categories[6]._id,
            tags: ['accessories', 'necklace', 'silver'],
            basePrice: 499,
            variations: [
                { color: 'Silver', colorHex: '#C0C0C0', sizes: [{ size: 'One Size', stock: 40 }] },
                { color: 'Gold', colorHex: '#FFD700', sizes: [{ size: 'One Size', stock: 35 }] },
            ],
        },
    ];
    for (const p of productData) {
        await Product.create({ ...p, publishedAt: new Date() });
    }
    console.log('✓ 14 products seeded');
    await FrontendContent.deleteMany({});
    await FrontendContent.insertMany([
        {
            section: 'announcement_bar',
            data: {
                isVisible: true,
                text: 'FREE DELIVERY ABOVE ৳2000 • EID COLLECTION OUT NOW',
                backgroundColor: '#c8a96e',
                textColor: '#0a0a0a',
            },
        },
        {
            section: 'hero',
            data: {
                backgroundType: 'image',
                backgroundUrl: '',
                headline: 'CANVO',
                subheadline: 'Premium Fashion — Bangladesh',
                ctaText: 'Shop Now',
                ctaLink: '/shop',
            },
        },
        {
            section: 'footer',
            data: {
                address: 'Sirajganj, Bangladesh',
                phone: '+880 1XXX-XXXXXX',
                email: 'info@canvo.com.bd',
                quickLinks: [
                    { label: 'About Us', url: '/about' },
                    { label: 'Contact', url: '/contact' },
                    { label: 'Return Policy', url: '/return-policy' },
                ],
            },
        },
        {
            section: 'social_links',
            data: {
                facebook: '#',
                instagram: '#',
                whatsapp: '#',
            },
        },
    ]);
    console.log('✓ Frontend content defaults seeded');
    await Discount.deleteMany({});
    await Discount.insertMany([
        {
            type: 'coupon_code',
            code: 'CANVO10',
            title: '10% Off Everything',
            discountType: 'percentage',
            discountValue: 10,
            maxDiscountAmount: 500,
            startDate: new Date('2026-01-01'),
            endDate: new Date('2027-01-01'),
            usageLimit: 1000,
            isActive: true,
        },
        {
            type: 'coupon_code',
            code: 'WELCOME50',
            title: '৳50 Off Your First Order',
            discountType: 'flat_amount',
            discountValue: 50,
            minOrderAmount: 500,
            startDate: new Date('2026-01-01'),
            endDate: new Date('2027-01-01'),
            usageLimit: 500,
            isActive: true,
        },
        {
            type: 'coupon_code',
            code: 'EID20',
            title: '20% Off Panjabi',
            discountType: 'percentage',
            discountValue: 20,
            maxDiscountAmount: 1000,
            applicableTo: 'category',
            startDate: new Date('2026-01-01'),
            endDate: new Date('2027-01-01'),
            usageLimit: 300,
            isActive: true,
        },
    ]);
    console.log('✓ Discount codes seeded');
    await mongoose_1.default.disconnect();
    console.log('\n✓ Seed complete!');
}
seed().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map