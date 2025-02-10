import { Path, PathValue } from "react-hook-form";

export interface IForm<T> {
  property: Path<T>;
  value: PathValue<T, Path<T>>
}
