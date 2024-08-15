interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(key: keyof UserProps): string | number | undefined {
    return this.data[key];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    this.events[eventName] = this.events[eventName]
      ? [...this.events[eventName], callback]
      : [callback];
  }

  trigger(eventName: string): void {
    const handlers: Callback[] | undefined = this.events[eventName];

    if (!handlers || !handlers.length) return;

    handlers.forEach((callback: Callback) => {
      callback();
    });
  }

  fetch(): void {
    fetch(`http://localhost:3000/users/${this.get("id")}`)
      .then((res: Response) => {
        return res.json();
      })
      .then((data: UserProps) => {
        this.set(data);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }

  save(): void {
    const id = this.get("id");

    if (id) {
      fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(this.data),
      });
    } else {
      fetch(`http://localhost:3000/users/`, {
        method: "POST",
        body: JSON.stringify(this.data),
      });
    }
  }
}
