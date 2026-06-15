export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginateOptions {
  page: number;
  limit: number;
  sort?: Record<string, 1 | -1>;
  populate?: string | { path: string; select?: string } | (string | { path: string; select?: string })[];
  select?: string;
  lean?: boolean;
}

export type FilterObject = Record<string, any>;

export class QueryHelper {
  static buildTextSearch(
    fields: string[],
    term?: string | null,
  ): FilterObject | undefined {
    if (!term || term.trim().length === 0) return undefined;
    return {
      $or: fields.map((field) => ({
        [field]: { $regex: term.trim(), $options: 'i' },
      })),
    };
  }

  static buildRegexFilter(
    field: string,
    term?: string | null,
  ): FilterObject | undefined {
    if (!term || term.trim().length === 0) return undefined;
    return { [field]: { $regex: term.trim(), $options: 'i' } };
  }

  static buildRangeFilter(
    field: string,
    min?: number | null,
    max?: number | null,
  ): FilterObject | undefined {
    if (min == null && max == null) return undefined;
    const range: Record<string, number> = {};
    if (min != null) range.$gte = min;
    if (max != null) range.$lte = max;
    return { [field]: range };
  }

  static buildDateRangeFilter(
    field: string,
    startDate?: string | Date | null,
    endDate?: string | Date | null,
  ): FilterObject | undefined {
    if (!startDate && !endDate) return undefined;
    const range: Record<string, Date> = {};
    if (startDate) range.$gte = new Date(startDate);
    if (endDate) range.$lte = new Date(endDate);
    return { [field]: range };
  }

  static buildMatchFilter(
    field: string,
    value?: any,
  ): FilterObject | undefined {
    if (value === undefined || value === null || value === '') return undefined;
    return { [field]: value };
  }

  static buildBoolFilter(
    field: string,
    value?: boolean | null,
  ): FilterObject | undefined {
    if (value === undefined || value === null) return undefined;
    return { [field]: value };
  }

  static buildInFilter(
    field: string,
    values?: any[],
  ): FilterObject | undefined {
    if (!values || values.length === 0) return undefined;
    return { [field]: { $in: values } };
  }

  static buildExistsFilter(
    field: string,
    exists: boolean = true,
  ): FilterObject {
    return { [field]: { $exists: exists } };
  }

  static buildOrFilter(
    ...conditions: (FilterObject | undefined)[]
  ): FilterObject | undefined {
    const defined = conditions.filter(Boolean) as FilterObject[];
    if (defined.length === 0) return undefined;
    if (defined.length === 1) return defined[0];
    return { $or: defined };
  }

  static buildNotEqualFilter(
    field: string,
    value?: any,
  ): FilterObject | undefined {
    if (value === undefined || value === null) return undefined;
    return { [field]: { $ne: value } };
  }

  static buildSort(
    sortKey?: string | null,
    defaults: Record<string, 1 | -1> = { createdAt: -1 },
  ): Record<string, 1 | -1> {
    if (!sortKey) return defaults;

    const sortMap: Record<string, Record<string, 1 | -1>> = {
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

  static combine(
    ...filters: (FilterObject | undefined)[]
  ): FilterObject {
    const defined = filters.filter(Boolean) as FilterObject[];
    if (defined.length === 0) return {};
    if (defined.length === 1) return defined[0];
    return { $and: defined };
  }

  static getSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  static buildPaginatedResponse<T>(
    items: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginatedResult<T> {
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  static async paginate<T>(
    model: any,
    filter: FilterObject,
    options: PaginateOptions,
  ): Promise<PaginatedResult<T>> {
    const { page, limit, sort, populate, select, lean } = options;
    const skip = (page - 1) * limit;

    let query = model.find(filter);

    if (select) query = query.select(select);
    if (populate) {
      const pop = populate;
      if (Array.isArray(pop)) {
        pop.forEach((p: any) => query.populate(p));
      } else {
        query = query.populate(pop as any);
      }
    }
    if (lean) query = query.lean();

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
