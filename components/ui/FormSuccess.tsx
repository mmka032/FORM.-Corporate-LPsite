// Form成功画面UI

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
            <div className="form-success-content">
                <div className="form-success-message">
                    <p>お問い合わせを受け付けました</p>
                    <p>内容を確認の上、ご連絡いたします。</p>
                </div>

                {/* Back Button */}
                <button
                    // もしこのボタンが<form>タグの中に置かれる可能性がある場合、
                    // type="button"を明示しておかないと、デフォルトでsubmit扱いになり、意図せずフォーム送信が起きてしまうことがある。
                    // FormButtonコンポーネントでも同じ考え方でしたね(→前に見たtype = "button"のデフォルト値)
                    type="button"
                    className="button form-success-button"
                    // onClick={onBack}:ボタンが押されたら、Propsで受け取ったonBack関数をそのまま実行する
                    onClick={onBack}
                >
                    BACK TO TOP
                </button>
            </div>
        </div>
    )
};
