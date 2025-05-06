export interface DomainItem {
  name: string;
  type: number;
  domain: string;
  subDomain?: string;
  directory?: string;
  queryBefore?: string;
  queryAfter?: string;
  queryAlt?: string;
}

export interface ButtonItem {
  name: string;
  isActive: boolean;
}

export interface CategoryItem {
  name: string;
  isActive: boolean;
  list: ButtonItem[];
}
