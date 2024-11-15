import Link from "next/link";

export default function TodoItem({ todo, onDelete }) {
  return (
    <li>
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      <Link href={`/edit/${todo.id}`}>Edit</Link>
    </li>
  );
}
