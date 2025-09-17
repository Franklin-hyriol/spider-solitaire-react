import { FiAlertTriangle } from "react-icons/fi";

type ConfirmActionProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmAction({ title, message, onConfirm, onCancel }: ConfirmActionProps) {
  return (
    <div className="max-w-md w-[448px] h-fit p-8 flex flex-col items-center gap-4">
      <h2 className="w-full text-center text-3xl font-bold text-emerald-800 mb-4 pb-4 border-b-4 border-emerald-600">
        {title}
      </h2>

      <FiAlertTriangle size={48} className="text-warning my-4" />

      <p className="text-center text-base-content/80 mb-6">{message}</p>

      <div className="flex gap-4 w-full">
        <button onClick={onCancel} className="btn btn-dash btn-secondary flex-1">
          Annuler
        </button>
        <button onClick={onConfirm} className="btn btn-dash btn-primary flex-1">
          Confirmer
        </button>
      </div>
    </div>
  );
}
