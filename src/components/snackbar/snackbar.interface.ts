export interface ISnackbar {
  title: string;
  action: string;
  type: 'success' | 'warning' | 'error' | 'info';
}
