import { ID } from '@datorama/akita';
import { BranchInListDto } from '@bb/shared/dtos';
import { Gender } from '../../enums';

export class Customer{
  id: string
  first_name: string
  last_name: string
  customer_no: string
  business_name: string
  branch_id: string
  email: string
  country_code: string
  phone_number: string
  gender: string|Gender
  city: string
  address: string
  credit_source: string
  photo_url: string
  // password: string
}

export class AddCustomerDto{
  
}


export class EditCustomerDto{
  id: string;

}


export function createCustomer(params: Partial<Customer>) {
  return {

  } as Customer;
}
