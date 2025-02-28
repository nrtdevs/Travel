// export function getEnumKeyValuePairs<T>(
//     enumObj: T,
//   ): { key: string; value: string }[] {
//     return Object.keys(enumObj)
//       .filter((key) => typeof enumObj[key as keyof T] === 'string') // Filter out numeric values in reverse-mapped enums (if any)
//       .map((key) => ({
//         key,
//         value: enumObj[key as keyof T] as string,
//       }))
//   }

export function getEnumKeyValuePairs<T extends Record<string, string>>(
    enumObj: T
  ): { key: string; value: string }[] {
    return Object.entries(enumObj).map(([key, value]) => ({
      key,
      value,
    }));
  }
  
  
  export enum ErrorCodes {
    CANNOT_DELETE_SUPER_ADMIN = 'Cannot delete this user',
    // 400 - Bad Request Errors
    BAD_REQUEST = 'BAD_REQUEST',
    ASSET_NOT_FOUND = 'ASSET_NOT_FOUND',
    ASSET_ALREADY_ASSIGNED = 'Asset Already Assigned To User',
    INVALID_INPUT = 'The input provided is not valid. Please check your request data.',
    SEASONS_NOT_FOUND = 'SEASONS_NOT_FOUND',
    // 401 - Unauthorized Errors
    UNAUTHORIZED = 'You are not authorized to access this resource.',
    INVALID_TOKEN = 'The token provided is invalid or expired. Please log in again.',
    NOT_AUTHENTICATED_LOGIN = 'You are not authenticated. Please log in to access this resource.',
    NOT_UNAUTHORIZED_ACTION = 'You are not authorized to perform this action.',
  
    // 403 - Forbidden Errors
    FORBIDDEN = 'FORBIDDEN',
    ACCESS_DENIED = 'You do not have permission to access this resource.',
  
    // 404 - Not Found Errors
    NOT_FOUND = 'NOT_FOUND',
    ITEM_NOT_FOUND = 'Item not found, Please check the given item ID',
  
    // 409 - Conflict Errors
    CONFLICT = 'CONFLICT',
    DUPLICATE_ENTRY = 'A resource with the same unique identifier already exists.',
  
    // 500 - Internal Server Errors
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    SERVER_ERROR = 'An unexpected error occurred on the server. Please try again later.',
  
    // 503 - Service Unavailable
    SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
    MAINTENANCE_MODE = 'The service is temporarily unavailable due to maintenance. Please try again later.',
  
    // Custom Error Codes
    ID_NOT_FOUND = 'Please provide a valid ID.',
    COMPANY_NOT_FOUND = 'Company not found',
    INDENT_NOT_FOUND = 'Please check the indent ID',
    SUPPLIER_NOT_FOUND = 'Please check the supplier ID',
    QUOTATION_NOT_FOUND = 'Please check the quotation ID',
    PURCHASE_ORDER_NOT_FOUND = 'Please check the purchase order ID',
    USER_NOT_FOUND = 'Please check the user ID',
    INVALID_ROLE = 'Invalid role provided, Please check the role ID',
  
    // Receiving
    RECEIVING_NOT_FOUND = 'Receiving not found',
    INVALID_RECEIVING_QUANTITY = 'Invalid quantity provided, Quantity should not be greater than the ordered quantity',
  
    // Customer
    CUSTOMER_NOT_FOUND = 'Customer not found',
  
    // Estimate Creation
    ESTIMATE_CREATION_NOT_FOUND = 'Estimate creation not found',
    INVALID_ITEM_ID_PROVIDED = 'Invalid item ID provided, please check if it belongs to the entity',
    ESTIMATE_NOT_FOUND = 'Estimate not found',
  
    // Sales Invoice
    SALES_INVOICE_NOT_FOUND = 'Sales Invoice not found',
  
    // Revenue Tracking
    REVENUE_TRACKING_NOT_FOUND = 'Revenue Tracking not found',
  
    // Category
    CATEGORY_NOT_FOUND = 'Category not found',
  
    // Bank Account
    BANK_ACCOUNT_NOT_FOUND = 'Bank Account not found',
  
    // Credit Note
    CREDIT_NOTE_NOT_FOUND = 'Credit Note not found',
  
    // warehouse
    WAREHOUSE_NOT_FOUND = 'Warehouse not found, Please check the warehouse ID',
  
    // Expense
    EXPENSE_NOT_FOUND = 'Expense not found',
  
    // Purchase Payment
    PURCHASE_PAYMENT_NOT_FOUND = 'Purchase Payment not found',
  
    // Purchase Bill
    PURCHASE_BILL_NOT_FOUND = 'Purchase Bill not found',
  
    // Debit Note
    DEBIT_NOTE_NOT_FOUND = 'Debit Note not found',
  
    // company
    RO_ID_REQUIRED = 'RO ID is required',
    INVALID_COMPANY_TYPE = 'Invalid company type provided',
  
    UPDATE_NOT_ALLOWED = 'Update not allowed',
    INDENT_NOT_APPROVED = 'Indent is not approved',
    QUOTATION_NOT_APPROVED = 'Quotation is not approved',
    PURCHASE_ORDER_NOT_APPROVED = 'Purchase Order is not approved',
    STOCK_TRANSFER_NOT_FOUND = 'Stock Transfer not found',
  
    // BANK
    INSUFFICIENT_BALANCE = 'Insufficient balance in the bank account',
    SELL_NOT_FOUND = 'Sell not found',
  
    // PM INVOICES
    PM_INVOICE_NOT_FOUND = 'Invoice not found',
  
    // Chart of Account
    CHART_OF_ACCOUNT_NOT_FOUND = 'Chart of Account not found',
    JOURNAL_ACCOUNT_NOT_FOUND = 'Journal Account not found',
    CREDIT_DEBIT_BOTH_PROVIDED = 'Both credit and debit cannot be provided at the same time',
    CREDIT_DEBIT_MISSING = 'Either credit or debit should be provided',
    CREDIT_DEBIT_NOT_EQUAL = 'Credit and Debit amounts are not equal',
    NO_JOURNAL_ITEMS_PROVIDED = 'No journal items provided',
  
    // TAx
    TAX_NOT_FOUND = 'Tax not found',
    SALE_ITEMS_NOT_FOUND = 'Sale items not found',
  
    // Units
    PARENT_UNIT_NOT_FOUND = 'Parent unit not found',
    UNIT_NOT_FOUND = 'Unit not found',
  
    COMPANY_PRODUCT_NOT_FOUND = 'Company Product not found',
  
    GRADE_REQUIRED = 'At least 1 Grade is required',
  
    // credit note
    CREDIT_NOTE_AMOUNT_EXCEEDS = 'Credit note amount exceeds the invoice amount',
    ASSIGN_ASSET_BY_USER_NOT_FOUND = 'Assign Asset By User not found',
    INVALID_ENTITY_PROVIDED = 'Only one of supplier, customer, or employee must be provided.',
  
    LEDGER_NOT_FOUND = 'Ledger not found',
    ACCOUNT_NUMBER_ALREADY_EXISTS = 'Account number already exists',
    CUSTOMER_ADHARNUMBER_ALREADY_EXISTS = 'Customer Aadhaar Number already exists',
    INVALID_YEAR = 'Invalid year provided',
    CHART_OF_ACCOUNT_DEBIT_NOT_FOUND = 'Chart of Account Debit not found',
    CHART_OF_ACCOUNT_CREDIT_NOT_FOUND = 'Chart of Account Credit not found',
    PURCHASE_BILL_ALREADY_PAID = 'Purchase Bill is already paid',
    AMOUNT_SHOULD_BE_LESS_THAN_TOTAL_AMOUNT = 'Amount should be less than or equal to bill amount',
    COMPANY_PRODUCT_ALREADY_EXISTS = 'Company Product already exists',
    BANK_ACCOUNT_STATUS_UPDATED_SUCCESSFULLY = 'Bank Account status updated successfully',
    INVALID_CHART_OF_ACCOUNT_SELECTED_FOR_SALE = 'Invalid chart of account selected for sale',
    INSUFFICIENT_QUANTITY = 'Insufficient quantity available',
    IUT_NOT_FOUND = 'IUT not found',
    INVALID_QUANTITY_PROVIDED = 'Invalid quantity provided',
    PURCHASE_PM_ITEM_NOT_FOUND = 'Purchase PM Item not found',
    ROLE_ASSIGNED_TO_USER = 'Role is assigned to user, Please remove the role from the user and try again',
    UNAUTHORIZED_ACTION = 'You are not authorized to perform this action',
    PARENT_ACCOUNT_ID_REQUIRED = 'Parent Account is required when subAccount is checked',
    INVALID_PARENT_ACCOUNT_ID = 'Invalid Parent Account ID provided ',
    ACCOUNT_TYPE_ID_REQUIRED = 'Account Type is required when subAccount is not checked',
    INVALID_ACCOUNT_TYPE_ID = 'Invalid Account Type ID provided',
    INVALID_START_YEAR = 'Invalid start year and end year provided',
    STOCK_TRANSFER_DISPATCH_NOT_FOUND = 'Stock Transfer of status Dispatched only can be Deleted',
  }
  