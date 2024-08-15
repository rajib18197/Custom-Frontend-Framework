interface UserProps {
  name?: string;
  age?: number;
}

export class User {
  constructor(private data: UserProps) {}

  get(key: keyof UserProps): string | number | undefined {
    return this.data[key];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
}
