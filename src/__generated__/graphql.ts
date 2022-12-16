/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
  UUID: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER'
}

/** Thông tin giỏ hàng */
export type CartItems = {
  __typename?: 'CartItems';
  amount: Scalars['Int'];
  cartsId: Scalars['UUID'];
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  products?: Maybe<Array<Maybe<Products>>>;
  productsId: Scalars['UUID'];
  updatedAt: Scalars['DateTime'];
};

/** Thông tin giỏ hàng */
export type Carts = {
  __typename?: 'Carts';
  cartItems?: Maybe<Array<Maybe<CartItems>>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Users>;
  usersId: Scalars['UUID'];
};

/** A connection to a list of items. */
export type CartsConnection = {
  __typename?: 'CartsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CartsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Carts>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type CartsEdge = {
  __typename?: 'CartsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Carts>;
};

export type CartsFilterInput = {
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
  usersIds?: InputMaybe<Array<Scalars['UUID']>>;
};

/** Thông tin danh mục sản phẩm */
export type Categories = {
  __typename?: 'Categories';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type CategoriesConnection = {
  __typename?: 'CategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Categories>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type CategoriesEdge = {
  __typename?: 'CategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Categories>;
};

export type CategoriesFilterInput = {
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  descriptions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
};

export type CreateCartInput = {
  cartItems?: InputMaybe<Array<InputMaybe<CreateCartItemInput>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  usersId?: InputMaybe<Scalars['UUID']>;
};

export type CreateCartItemInput = {
  amount?: InputMaybe<Scalars['Int']>;
  cartsId?: InputMaybe<Scalars['UUID']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['UUID']>;
  productsId?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreateCartPayload = {
  __typename?: 'CreateCartPayload';
  carts?: Maybe<Carts>;
};

export type CreateCategoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreateCategoryPayload = {
  __typename?: 'CreateCategoryPayload';
  categories?: Maybe<Categories>;
};

export type CreateCustomerPaymentInput = {
  address?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['UUID']>;
  paymentMethodsId?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type CreateCustomerPaymentPayload = {
  __typename?: 'CreateCustomerPaymentPayload';
  customerPayments?: Maybe<CustomerPayments>;
};

export type CreateManufactureInfoInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['UUID']>;
  manufacturedAt?: InputMaybe<Scalars['DateTime']>;
  manufacturersId?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreateManufactureInfoPayload = {
  __typename?: 'CreateManufactureInfoPayload';
  manufactureInfos?: Maybe<ManufactureInfos>;
};

export type CreateManufacturerInput = {
  address?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreateManufacturerPayload = {
  __typename?: 'CreateManufacturerPayload';
  manufacturers?: Maybe<Manufacturers>;
};

export type CreateMetaDataInput = {
  audio?: InputMaybe<Scalars['String']>;
  battery?: InputMaybe<Scalars['String']>;
  cPUSeries?: InputMaybe<Scalars['String']>;
  camera?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dimensions?: InputMaybe<Scalars['String']>;
  gPUSeries?: InputMaybe<Scalars['String']>;
  hardDrive?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  manufacturersId?: InputMaybe<Scalars['UUID']>;
  operatingSystem?: InputMaybe<Scalars['String']>;
  ports?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['DateTime']>;
  ram?: InputMaybe<Scalars['String']>;
  screenResolution?: InputMaybe<Scalars['String']>;
  seriesName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  wLAN?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['String']>;
};

export type CreatePaymentMethodInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Scalars['String']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreatePaymentMethodPayload = {
  __typename?: 'CreatePaymentMethodPayload';
  paymentMethods?: Maybe<PaymentMethods>;
};

export type CreateProductInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['UUID']>;
  manufactureInfosId?: InputMaybe<Scalars['UUID']>;
  productTypesId?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreateProductPayload = {
  __typename?: 'CreateProductPayload';
  products?: Maybe<Products>;
};

export type CreateProductTypeInput = {
  categoriesIds?: InputMaybe<Array<Scalars['UUID']>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  metaDatas: CreateMetaDataInput;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Decimal']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  warrentyDate?: InputMaybe<Scalars['DateTime']>;
};

export type CreateProductTypePayload = {
  __typename?: 'CreateProductTypePayload';
  productTypes?: Maybe<ProductTypes>;
};

export type CreateRoleInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreateRolePayload = {
  __typename?: 'CreateRolePayload';
  roles?: Maybe<Roles>;
};

/** Thông tin thanh toán khách hàng */
export type CustomerPayments = {
  __typename?: 'CustomerPayments';
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  paymentMethods?: Maybe<PaymentMethods>;
  paymentMethodsId: Scalars['UUID'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['UUID'];
  users?: Maybe<Users>;
};

/** A connection to a list of items. */
export type CustomerPaymentsConnection = {
  __typename?: 'CustomerPaymentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CustomerPaymentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<CustomerPayments>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type CustomerPaymentsEdge = {
  __typename?: 'CustomerPaymentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<CustomerPayments>;
};

export type CustomerPaymentsFilterInput = {
  address?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  paymentMethodsIds?: InputMaybe<Array<Scalars['UUID']>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
  userIds?: InputMaybe<Array<Scalars['UUID']>>;
};

export type DeleteCartInput = {
  id: Scalars['UUID'];
};

export type DeleteCartPayload = {
  __typename?: 'DeleteCartPayload';
  carts?: Maybe<Carts>;
};

export type DeleteCategoryInput = {
  id: Scalars['UUID'];
};

export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  categories?: Maybe<Categories>;
};

export type DeleteCustomerPaymentInput = {
  id: Scalars['UUID'];
};

export type DeleteCustomerPaymentPayload = {
  __typename?: 'DeleteCustomerPaymentPayload';
  customerPayments?: Maybe<CustomerPayments>;
};

export type DeleteManufactureInfoInput = {
  id: Scalars['UUID'];
};

export type DeleteManufactureInfoPayload = {
  __typename?: 'DeleteManufactureInfoPayload';
  manufactureInfos?: Maybe<ManufactureInfos>;
};

export type DeleteManufacturerInput = {
  id: Scalars['UUID'];
};

export type DeleteManufacturerPayload = {
  __typename?: 'DeleteManufacturerPayload';
  manufacturers?: Maybe<Manufacturers>;
};

export type DeleteMediasInput = {
  ids?: InputMaybe<Array<Scalars['UUID']>>;
};

export type DeleteMediasPayload = {
  __typename?: 'DeleteMediasPayload';
  medias?: Maybe<Array<Maybe<Medias>>>;
};

export type DeletePaymentMethodInput = {
  id: Scalars['UUID'];
};

export type DeletePaymentMethodPayload = {
  __typename?: 'DeletePaymentMethodPayload';
  paymentMethods?: Maybe<PaymentMethods>;
};

export type DeleteProductInput = {
  id: Scalars['UUID'];
};

export type DeleteProductPayload = {
  __typename?: 'DeleteProductPayload';
  products?: Maybe<Products>;
};

export type DeleteProductTypeInput = {
  id: Scalars['UUID'];
};

export type DeleteProductTypePayload = {
  __typename?: 'DeleteProductTypePayload';
  productTypes?: Maybe<ProductTypes>;
};

export type ForgotPasswordInput = {
  email?: InputMaybe<Scalars['String']>;
};

export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  string?: Maybe<Scalars['String']>;
};

/** Thông tin sản xuất của sản phẩm */
export type ManufactureInfos = {
  __typename?: 'ManufactureInfos';
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  manufacturedAt?: Maybe<Scalars['DateTime']>;
  manufacturers?: Maybe<Array<Maybe<Manufacturers>>>;
  manufacturersId: Scalars['UUID'];
  updatedAt: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type ManufactureInfosConnection = {
  __typename?: 'ManufactureInfosConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ManufactureInfosEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ManufactureInfos>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ManufactureInfosEdge = {
  __typename?: 'ManufactureInfosEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<ManufactureInfos>;
};

export type ManufactureInfosFilterInput = {
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  manufacturedFrom?: InputMaybe<Scalars['DateTime']>;
  manufacturedTo?: InputMaybe<Scalars['DateTime']>;
  manufacturersIds?: InputMaybe<Array<Scalars['UUID']>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
};

/** Thông tin của nhà sản xuất */
export type Manufacturers = {
  __typename?: 'Manufacturers';
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  medias?: Maybe<Array<Maybe<Medias>>>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type ManufacturersConnection = {
  __typename?: 'ManufacturersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ManufacturersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Manufacturers>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ManufacturersEdge = {
  __typename?: 'ManufacturersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Manufacturers>;
};

export type ManufacturersFilterInput = {
  address?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  descriptions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
};

/** Thông tin tập tin */
export type Medias = {
  __typename?: 'Medias';
  createdAt: Scalars['DateTime'];
  filePath: Scalars['String'];
  fileSize?: Maybe<Scalars['Decimal']>;
  fileType: Scalars['String'];
  id: Scalars['UUID'];
  updatedAt: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type MediasConnection = {
  __typename?: 'MediasConnection';
  /** A list of edges. */
  edges?: Maybe<Array<MediasEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Medias>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type MediasEdge = {
  __typename?: 'MediasEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Medias>;
};

export type MediasFilterInput = {
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  filePaths?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileSizeFrom?: InputMaybe<Scalars['Decimal']>;
  fileSizeTo?: InputMaybe<Scalars['Decimal']>;
  fileTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
};

export type MetaDatas = {
  __typename?: 'MetaDatas';
  audio?: Maybe<Scalars['String']>;
  battery?: Maybe<Scalars['String']>;
  cPUSeries?: Maybe<Scalars['String']>;
  camera?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dimensions?: Maybe<Scalars['String']>;
  gPUSeries?: Maybe<Scalars['String']>;
  hardDrive?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  manufacturers?: Maybe<Manufacturers>;
  manufacturersId: Scalars['UUID'];
  operatingSystem?: Maybe<Scalars['String']>;
  ports?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['DateTime']>;
  ram?: Maybe<Scalars['String']>;
  screenResolution?: Maybe<Scalars['String']>;
  seriesName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  wLAN?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['String']>;
};

export type MetaDatasFilterInput = {
  audios?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  batteries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  cPUSeries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  cameras?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  colors?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  dimensions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  gPUSeries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  hardDrives?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  manufacturersIds?: InputMaybe<Array<Scalars['UUID']>>;
  operatingSystems?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ports?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedFrom?: InputMaybe<Scalars['DateTime']>;
  publishedTo?: InputMaybe<Scalars['DateTime']>;
  rams?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  screenResolutions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  seriesNames?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
  wLANs?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  weights?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCart: CreateCartPayload;
  createCategory: CreateCategoryPayload;
  createCustomerPayment: CreateCustomerPaymentPayload;
  createManufactureInfo: CreateManufactureInfoPayload;
  createManufacturer: CreateManufacturerPayload;
  createPaymentMethod: CreatePaymentMethodPayload;
  createProduct: CreateProductPayload;
  createProductType: CreateProductTypePayload;
  createRole: CreateRolePayload;
  deleteCart: DeleteCartPayload;
  deleteCategory: DeleteCategoryPayload;
  deleteCustomerPayment: DeleteCustomerPaymentPayload;
  deleteManufactureInfo: DeleteManufactureInfoPayload;
  deleteManufacturer: DeleteManufacturerPayload;
  deleteMedias: DeleteMediasPayload;
  deletePaymentMethod: DeletePaymentMethodPayload;
  deleteProduct: DeleteProductPayload;
  deleteProductType: DeleteProductTypePayload;
  forgotPassword: ForgotPasswordPayload;
  register: RegisterPayload;
  registerStaff: RegisterStaffPayload;
  updateCart: UpdateCartPayload;
  updateCategory: UpdateCategoryPayload;
  updateCustomerPayment: UpdateCustomerPaymentPayload;
  updateManufactureInfo: UpdateManufactureInfoPayload;
  updateManufacturer: UpdateManufacturerPayload;
  updatePaymentMethod: UpdatePaymentMethodPayload;
  updateProduct: UpdateProductPayload;
  updateProductType: UpdateProductTypePayload;
  updateUsers: UpdateUsersPayload;
  updateUsersAdmin: UpdateUsersAdminPayload;
  uploadMedias: UploadMediasPayload;
};


export type MutationCreateCartArgs = {
  input?: InputMaybe<CreateCartInput>;
};


export type MutationCreateCategoryArgs = {
  input?: InputMaybe<CreateCategoryInput>;
};


export type MutationCreateCustomerPaymentArgs = {
  input?: InputMaybe<CreateCustomerPaymentInput>;
};


export type MutationCreateManufactureInfoArgs = {
  input?: InputMaybe<CreateManufactureInfoInput>;
};


export type MutationCreateManufacturerArgs = {
  files?: InputMaybe<Array<Scalars['Upload']>>;
  input?: InputMaybe<CreateManufacturerInput>;
};


export type MutationCreatePaymentMethodArgs = {
  input?: InputMaybe<CreatePaymentMethodInput>;
};


export type MutationCreateProductArgs = {
  input?: InputMaybe<CreateProductInput>;
};


export type MutationCreateProductTypeArgs = {
  files?: InputMaybe<Array<Scalars['Upload']>>;
  input?: InputMaybe<CreateProductTypeInput>;
};


export type MutationCreateRoleArgs = {
  input?: InputMaybe<CreateRoleInput>;
};


export type MutationDeleteCartArgs = {
  input: DeleteCartInput;
};


export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};


export type MutationDeleteCustomerPaymentArgs = {
  input: DeleteCustomerPaymentInput;
};


export type MutationDeleteManufactureInfoArgs = {
  input: DeleteManufactureInfoInput;
};


export type MutationDeleteManufacturerArgs = {
  input: DeleteManufacturerInput;
};


export type MutationDeleteMediasArgs = {
  input: DeleteMediasInput;
};


export type MutationDeletePaymentMethodArgs = {
  input: DeletePaymentMethodInput;
};


export type MutationDeleteProductArgs = {
  input: DeleteProductInput;
};


export type MutationDeleteProductTypeArgs = {
  input: DeleteProductTypeInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationRegisterArgs = {
  input?: InputMaybe<RegisterInput>;
};


export type MutationRegisterStaffArgs = {
  input: RegisterStaffInput;
};


export type MutationUpdateCartArgs = {
  input?: InputMaybe<UpdateCartInput>;
};


export type MutationUpdateCategoryArgs = {
  input?: InputMaybe<UpdateCategoryInput>;
};


export type MutationUpdateCustomerPaymentArgs = {
  input?: InputMaybe<UpdateCustomerPaymentInput>;
};


export type MutationUpdateManufactureInfoArgs = {
  input?: InputMaybe<UpdateManufactureInfoInput>;
};


export type MutationUpdateManufacturerArgs = {
  input?: InputMaybe<UpdateManufacturerInput>;
};


export type MutationUpdatePaymentMethodArgs = {
  input?: InputMaybe<UpdatePaymentMethodInput>;
};


export type MutationUpdateProductArgs = {
  input?: InputMaybe<UpdateProductInput>;
};


export type MutationUpdateProductTypeArgs = {
  files?: InputMaybe<Array<Scalars['Upload']>>;
  input?: InputMaybe<UpdateProductTypeInput>;
};


export type MutationUpdateUsersArgs = {
  input: UpdateUsersInput;
};


export type MutationUpdateUsersAdminArgs = {
  input: UpdateUsersAdminInput;
};


export type MutationUploadMediasArgs = {
  input: UploadMediasInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** Thông tin của phương thức thanh toán */
export type PaymentMethods = {
  __typename?: 'PaymentMethods';
  createdAt: Scalars['DateTime'];
  currency: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type PaymentMethodsConnection = {
  __typename?: 'PaymentMethodsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PaymentMethodsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<PaymentMethods>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type PaymentMethodsEdge = {
  __typename?: 'PaymentMethodsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<PaymentMethods>;
};

export type PaymentMethodsFilterInput = {
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  descriptions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
};

/** Thông tin sản xuất của loại sản phẩm */
export type ProductTypes = {
  __typename?: 'ProductTypes';
  categories?: Maybe<Array<Maybe<Categories>>>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  medias?: Maybe<Array<Maybe<Medias>>>;
  metaDatas?: Maybe<Array<Maybe<MetaDatas>>>;
  metaDatasId: Scalars['UUID'];
  name: Scalars['String'];
  price?: Maybe<Scalars['Decimal']>;
  updatedAt: Scalars['DateTime'];
  warrentyDate?: Maybe<Scalars['DateTime']>;
};

/** A connection to a list of items. */
export type ProductTypesConnection = {
  __typename?: 'ProductTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ProductTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ProductTypes>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ProductTypesEdge = {
  __typename?: 'ProductTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<ProductTypes>;
};

export type ProductTypesFilterInput = {
  categoriesIds?: InputMaybe<Array<Scalars['UUID']>>;
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  descriptions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  metaDatas?: InputMaybe<MetaDatasFilterInput>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  priceFrom?: InputMaybe<Scalars['Decimal']>;
  priceTo?: InputMaybe<Scalars['Decimal']>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
  warrentyDateFrom?: InputMaybe<Scalars['DateTime']>;
  warrentyDateTo?: InputMaybe<Scalars['DateTime']>;
};

/** Thông tin sản phẩm */
export type Products = {
  __typename?: 'Products';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  manufactureInfos?: Maybe<Array<Maybe<ManufactureInfos>>>;
  manufactureInfosId: Scalars['UUID'];
  productTypes?: Maybe<Array<Maybe<ProductTypes>>>;
  productTypesId: Scalars['UUID'];
  updatedAt: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type ProductsConnection = {
  __typename?: 'ProductsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ProductsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Products>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ProductsEdge = {
  __typename?: 'ProductsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Products>;
};

export type ProductsFilterInput = {
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  manufactureInfosIds?: InputMaybe<Array<Scalars['UUID']>>;
  productTypesIds?: InputMaybe<Array<Scalars['UUID']>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  carts?: Maybe<CartsConnection>;
  categories?: Maybe<CategoriesConnection>;
  currentUsers?: Maybe<Array<Maybe<Users>>>;
  customerPayments?: Maybe<CustomerPaymentsConnection>;
  login?: Maybe<Scalars['String']>;
  manufactureInfos?: Maybe<ManufactureInfosConnection>;
  manufacturers?: Maybe<ManufacturersConnection>;
  medias?: Maybe<MediasConnection>;
  paymentMethods?: Maybe<PaymentMethodsConnection>;
  productTypes?: Maybe<ProductTypesConnection>;
  products?: Maybe<ProductsConnection>;
  roles?: Maybe<RolesConnection>;
  users?: Maybe<UsersConnection>;
};


export type QueryCartsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<CartsFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<CategoriesFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryCustomerPaymentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<CustomerPaymentsFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryLoginArgs = {
  input?: InputMaybe<UserAuthenticationInput>;
};


export type QueryManufactureInfosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<ManufactureInfosFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryManufacturersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<ManufacturersFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMediasArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<MediasFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPaymentMethodsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<PaymentMethodsFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryProductTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<ProductTypesFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<ProductsFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<RolesFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<UserFilterInput>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RegisterInput = {
  address?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dob?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  mediasId?: InputMaybe<Scalars['UUID']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  rolesId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  string?: Maybe<Scalars['String']>;
};

export type RegisterStaffInput = {
  input?: InputMaybe<RegisterInput>;
};

export type RegisterStaffPayload = {
  __typename?: 'RegisterStaffPayload';
  string?: Maybe<Scalars['String']>;
};

/** Thông tin của chức vụ */
export type Roles = {
  __typename?: 'Roles';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type RolesConnection = {
  __typename?: 'RolesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RolesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Roles>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type RolesEdge = {
  __typename?: 'RolesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Roles>;
};

export type RolesFilterInput = {
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  descriptions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateCartInput = {
  cartItems?: InputMaybe<Array<InputMaybe<CreateCartItemInput>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  usersId?: InputMaybe<Scalars['UUID']>;
};

export type UpdateCartPayload = {
  __typename?: 'UpdateCartPayload';
  carts?: Maybe<Carts>;
};

export type UpdateCategoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  categories?: Maybe<Categories>;
};

export type UpdateCustomerPaymentInput = {
  address?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  paymentMethodsId?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type UpdateCustomerPaymentPayload = {
  __typename?: 'UpdateCustomerPaymentPayload';
  customerPayments?: Maybe<CustomerPayments>;
};

export type UpdateManufactureInfoInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  manufacturedAt?: InputMaybe<Scalars['DateTime']>;
  manufacturersId?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateManufactureInfoPayload = {
  __typename?: 'UpdateManufactureInfoPayload';
  manufactureInfos?: Maybe<ManufactureInfos>;
};

export type UpdateManufacturerInput = {
  address?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateManufacturerPayload = {
  __typename?: 'UpdateManufacturerPayload';
  manufacturers?: Maybe<Manufacturers>;
};

export type UpdatePaymentMethodInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Scalars['String']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdatePaymentMethodPayload = {
  __typename?: 'UpdatePaymentMethodPayload';
  paymentMethods?: Maybe<PaymentMethods>;
};

export type UpdateProductInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  manufactureInfosId?: InputMaybe<Scalars['UUID']>;
  productTypesId?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateProductPayload = {
  __typename?: 'UpdateProductPayload';
  products?: Maybe<Products>;
};

export type UpdateProductTypeInput = {
  categoriesIds?: InputMaybe<Array<Scalars['UUID']>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  metaDatas: CreateMetaDataInput;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Decimal']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  warrentyDate?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateProductTypePayload = {
  __typename?: 'UpdateProductTypePayload';
  productTypes?: Maybe<ProductTypes>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dob?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  mediasId?: InputMaybe<Scalars['UUID']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  rolesId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateUsersAdminInput = {
  input?: InputMaybe<UpdateUserInput>;
};

export type UpdateUsersAdminPayload = {
  __typename?: 'UpdateUsersAdminPayload';
  users?: Maybe<Users>;
};

export type UpdateUsersInput = {
  input?: InputMaybe<UpdateUserInput>;
};

export type UpdateUsersPayload = {
  __typename?: 'UpdateUsersPayload';
  users?: Maybe<Users>;
};

export type UploadMediasInput = {
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
};

export type UploadMediasPayload = {
  __typename?: 'UploadMediasPayload';
  medias?: Maybe<Array<Maybe<Medias>>>;
};

export type UserAuthenticationInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type UserFilterInput = {
  address?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  createdFrom?: InputMaybe<Scalars['DateTime']>;
  createdTo?: InputMaybe<Scalars['DateTime']>;
  dobFrom?: InputMaybe<Scalars['DateTime']>;
  dobTo?: InputMaybe<Scalars['DateTime']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fullnames?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  mediaIds?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  passwords?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  role?: InputMaybe<Scalars['String']>;
  updatedFrom?: InputMaybe<Scalars['DateTime']>;
  updatedTo?: InputMaybe<Scalars['DateTime']>;
};

/** Thông tin của người dùng */
export type Users = {
  __typename?: 'Users';
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  fullname: Scalars['String'];
  id: Scalars['UUID'];
  medias?: Maybe<Array<Maybe<Medias>>>;
  mediasId?: Maybe<Scalars['UUID']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Roles>>>;
  rolesId: Scalars['UUID'];
  status: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Users>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Users>;
};
