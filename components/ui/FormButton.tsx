// Formの送信・BACK TO TOP ボタン

type FormButtonProps = {
    children: React.ReactNode; // ボタンの中に表示する内容(文字でもアイコンでも)を、呼び出し側が自由に決められるようにする型
    type?: "button" | "submit";  // HTMLの<button>が本来持っている属性。| ?がついているので省略可能。
    onClick?: () => void;  // クリックされたときの処理。| ?がついているので省略可能。
    className?: string;  // 呼び出し元で幅・余白などを上書きしたいとき用（例: FormSuccessの「BACK TO TOP」）
};

export default function FormButton({
    children,
    type = "button",
    onClick,
    className = "",
}: FormButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`button w-full py-1 ${className}`}
        >
            {children} {/* childrenに「送信」という文字を渡して使う。 */}
        </button>
    )

};
