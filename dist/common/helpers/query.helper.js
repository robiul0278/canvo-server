"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHelper = void 0;
class QueryHelper {
    static buildTextSearch(fields, term) {
        if (!term || term.trim().length === 0)
            return undefined;
        return {
            $or: fields.map((field) => ({
                [field]: { $regex: term.trim(), $options: 'i' },
            })),
        };
    }
    static buildRegexFilter(field, term) {
        if (!term || term.trim().length === 0)
            return undefined;
        return { [field]: { $regex: term.trim(), $options: 'i' } };
    }
    static buildRangeFilter(field, min, max) {
        if (min == null && max == null)
            return undefined;
        const range = {};
        if (min != null)
            range.$gte = min;
        if (max != null)
            range.$lte = max;
        return { [field]: range };
    }
    static buildDateRangeFilter(field, startDate, endDate) {
        if (!startDate && !endDate)
            return undefined;
        const range = {};
        if (startDate)
            range.$gte = new Date(startDate);
        if (endDate)
            range.$lte = new Date(endDate);
        return { [field]: range };
    }
    static buildMatchFilter(field, value) {
        if (value === undefined || value === null || value === '')
            return undefined;
        return { [field]: value };
    }
    static buildBoolFilter(field, value) {
        if (value === undefined || value === null)
            return undefined;
        return { [field]: value };
    }
    static buildInFilter(field, values) {
        if (!values || values.length === 0)
            return undefined;
        return { [field]: { $in: values } };
    }
    static buildExistsFilter(field, exists = true) {
        return { [field]: { $exists: exists } };
    }
    static buildOrFilter(...conditions) {
        const defined = conditions.filter(Boolean);
        if (defined.length === 0)
            return undefined;
        if (defined.length === 1)
            return defined[0];
        return { $or: defined };
    }
    static buildNotEqualFilter(field, value) {
        if (value === undefined || value === null)
            return undefined;
        return { [field]: { $ne: value } };
    }
    static buildSort(sortKey, defaults = { createdAt: -1 }) {
        if (!sortKey)
            return defaults;
        const sortMap = {
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
            price_asc: { basePrice: 1 },
            price_desc: { basePrice: -1 },
            popular: { 'ratings.count': -1 },
            rating: { 'ratings.average': -1 },
            name_asc: { name: 1 },
            name_desc: { name: -1 },
            updated: { updatedAt: -1 },
        };
        return sortMap[sortKey] || defaults;
    }
    static combine(...filters) {
        const defined = filters.filter(Boolean);
        if (defined.length === 0)
            return {};
        if (defined.length === 1)
            return defined[0];
        return { $and: defined };
    }
    static getSkip(page, limit) {
        return (page - 1) * limit;
    }
    static buildPaginatedResponse(items, total, page, limit) {
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
        };
    }
    static async paginate(model, filter, options) {
        const { page, limit, sort, populate, select, lean } = options;
        const skip = (page - 1) * limit;
        let query = model.find(filter);
        if (select)
            query = query.select(select);
        if (populate) {
            const pop = populate;
            if (Array.isArray(pop)) {
                pop.forEach((p) => query.populate(p));
            }
            else {
                query = query.populate(pop);
            }
        }
        if (lean)
            query = query.lean();
        query = query.sort(sort || { createdAt: -1 }).skip(skip).limit(limit);
        const [items, total] = await Promise.all([
            query.exec(),
            model.countDocuments(filter).exec(),
        ]);
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
        };
    }
}
exports.QueryHelper = QueryHelper;
//# sourceMappingURL=query.helper.js.map