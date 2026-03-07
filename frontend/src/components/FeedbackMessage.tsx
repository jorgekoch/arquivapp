type Props = {
  type: "success" | "error";
  message: string;
};

export function FeedbackMessage({ type, message }: Props) {
  return (
    <div className={`feedback-message ${type === "success" ? "success" : "error"}`}>
      {message}
    </div>
  );
}