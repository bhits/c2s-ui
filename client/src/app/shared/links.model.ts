export class Links {
  first: First;
  self: Self;
  next: Next;
  last: Last;
}

interface First {
  href: string;
}

interface Self {
  href: string;
}

interface Next {
  href: string;
}

interface Last {
  href: string;
}
