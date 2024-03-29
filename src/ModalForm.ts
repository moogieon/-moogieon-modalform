import { useEffect, useState, Dispatch, SetStateAction } from "react";
interface useFormProps {
  initialValues: Record<string, string>;
  onSubmit: (values: Record<string, string | number>) => void;
  validate: CallableFunction;
  errorModal?: Dispatch<SetStateAction<boolean>>;
}
const ModalForm = ({
  initialValues,
  onSubmit,
  validate,
  errorModal,
}: useFormProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    setSubmitting(true);
    event.preventDefault();
    setErrors(validate(values));
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
      }
      if (errorModal) {
        errorModal(true);
      }
      setSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
};

export default ModalForm;
