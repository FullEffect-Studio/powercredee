
export class BranchInListDto {
  id: string;
  name: string
  phone_number: string;
  address: string;
  createdAt: string|Date
  updatedAt: string|Date
}

export class EditBranchDto {
  id: string;

  name: string;

  phone_number: string;

  address: string;
}

export class AddBranchDto {
  name: string;

  phone_number: string;

  address: string;
}
