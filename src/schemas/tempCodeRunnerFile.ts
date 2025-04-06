    startDate: z.string({required_error: "Please provide start date"}).datetime(),
    endDate : z.string({required_error: "Please end date"}).datetime(),