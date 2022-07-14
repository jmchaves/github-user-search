export class User {
  constructor(
    public id: number,
    public username: string = "",
    public avatarUrl: string = "",
    public profileUrl: string = "",
    public siteAdmin: string = "",
    public score: number
  ) {
  }
}
