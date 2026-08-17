// Form成功画面UI

import FormButton from "./FormButton";

type FormSuccessProps = {
    onBack: () => void; // onBack:必須(?なし)のPropsで、型は() => void(引数なし・戻り値なしの関数)
    // 名前から「戻る(Back)ときの処理」を親から受け取る、という設計だと分かります。「トップに戻る」ボタンを押したときに何をするかは、
    // このコンポーネント自身では決めず、呼び出し側(おそらくContactForm側)に委ねている、という作りです
}

export default function FormSuccess({onBack}: FormSuccessProps) {
    return (
        <div className="form-success">
            {/* Title */}
            <h3 className="form-success-title">
                THANK YOU
            </h3>

            {/* Message */}
            <div>
                <div className="form-success-message">
                    <p>お問い合わせを受け付けました</p>
                    <p>内容を確認の上、ご連絡いたします。</p>
                </div>

                {/* Back Button */}
                {/* type="button"を明示（このボタンは<form>タグの中にあるため、
                    省略するとデフォルトでsubmit扱いになり、意図せずフォーム送信が起きてしまう） */}
                <FormButton
                    type="button"
                    className="form-success-button"
                    onClick={onBack}
                >
                    BACK TO TOP
                </FormButton>
            </div>
        </div>
    )
};
