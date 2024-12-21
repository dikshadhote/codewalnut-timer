import React from 'react';


interface ButtonGroupProps {
  isTitleValid: boolean;
  isTimeValid: boolean;
  onCancel: () => void;
  cancelText?: string;
  submitText?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  isTitleValid,
  isTimeValid,
  onCancel,
  cancelText = 'Cancel',
  submitText = 'Add Timer',
}) => {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
          isTitleValid && isTimeValid
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-blue-400 cursor-not-allowed'
        }`}
        disabled={!isTitleValid || !isTimeValid}
      >
        {submitText}
      </button>
    </div>
  );
};

export default ButtonGroup;
