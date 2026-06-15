export declare class ImageProcessorService {
    processProductImage(file: Express.Multer.File, productId: string, colorSlug: string): Promise<{
        url: string;
        thumbnailUrl: string;
    }>;
    deleteProductImage(filePath: string): Promise<void>;
}
