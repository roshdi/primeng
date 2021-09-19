/**
 * The aggregate operation.
 *
 * For more information, refer to the [`aggregateBy`]({% slug api_kendo-data-query_aggregateby %}) method.
 */
 export interface AggregateDescriptor {
    /**
     * The name of the record field on which the function will be executed.
     */
    field: string;
    /**
     * The aggregate function that will be calculated.
     */
    aggregate: 'count' | 'sum' | 'average' | 'min' | 'max';
}
