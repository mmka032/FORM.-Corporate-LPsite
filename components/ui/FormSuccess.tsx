// Form成功画面UI

type FormSuccessProps = {
    onBack: () => void;
}

export default function FormSuccess({onBack}: FormSuccessProps) {
    return (
        <div className="form-success">
            {/* Title */}
            <h3 className="form-success-title">
                THANK YOU
            </h3>

            {/* Message */}
            <div className="form-success-content">
                <div className="form-success-message">
                    <p>お問い合わせを受け付けました</p>
                    <p>内容を確認の上、ご連絡いたします。</p>
                </div>

                {/* Back Button */}
                <button
                    type="button"
                    className="button form-success-button"
                    onClick={onBack}
                >
                    BACK TO TOP
                </button>
            </div>
        </div>
    )
};
