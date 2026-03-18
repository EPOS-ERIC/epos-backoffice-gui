export interface FormTree {
  id: string;
  name: string;
  children: FormTree[];
  expanded?: boolean;
  active?: boolean;
}
