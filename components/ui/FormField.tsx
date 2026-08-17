// Form 入力欄

type FormFieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    required?: boolean;
    placeholder?: string;
    type?: "text" | "email";
    textarea?: boolean;
    maxLength?: number;
    error?: string;
};

export default function FormField({
    label,
    name,
    value,
    onChange,
    required = false,
    placeholder = "",
    type = "text",
    textarea = false,
    maxLength,
    error,
}: FormFieldProps) {

    const hasError = Boolean(error);

    return (
        <div>
            {/* label */}
            <div className="flex items-center gap-3.5">
                <label htmlFor={name} className="form-label">
                    {label}
                </label>

                {/* Required 必須 */}
                {required && 
                    <span className="form-required">
                        必須
                    </span>}
            </div>

            {/* Input / Textarea */}
            <div className="mt-3.5">
                {textarea ? (
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        onChange={onChange}
                        className={`
                            form-input
                            form-textarea
                            ${hasError ? "form-input-error" : ""}
                        `}
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${name}-error` : undefined}
                    />
                ) : (
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        className={`
                            form-input
                            ${hasError ? "form-input-error" : ""}
                        `}
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${name}-error` : undefined}
                    />
                )}
            </div>

            {/* Error */}
            {hasError && (
                <p
                    id={`${name}-error`}
                    className="form-error"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
