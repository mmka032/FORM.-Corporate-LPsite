// Form 全体のUI

"use client";

import React, { useState } from "react";
import FormField from "../ui/FormField";
import FormButton from "../ui/FormButton";
import FormSuccess from "../ui/FormSuccess";

// Form全体のデータ（お名前・会社名・メールアドレス・お問い合わせ内容）
type ContactFormData = {
    name: string;
    company: string;
    email: string;
    message: string;
};

// エラー
type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
};

export default function ContactForm() {
    // フォームの入力値
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        company: "",
        email: "",
        message: "",
    });

    // エラー内容
    const [errors, setErrors] = useState<FormErrors>({});

    // 成功状態
    const [isSubmitted, setIsSubmitted] = useState(false);


    // 入力内容が変わったとき
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // 入力したら、その項目のエラーを消す
        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    };

    // バリデーション
    const validateForm = () => {
        const newErrors: FormErrors = {};

        // お名前
        // .trim():文字列の前後の空白を取り除くメソッド。「スペースだけ入力して送信」を防ぐため
        // !(否定):「trimした結果が空文字(≒false扱い)なら」という意味
        if (!formData.name.trim()) {
            newErrors.name = "お名前を入力してください。";
        }

        
        // メールアドレス
        if (!formData.email.trim()) {
            newErrors.email = "メールアドレスを入力してください。";
        } else if (
            // 正規表現という、文字列のパターンを表す特殊な書き方。
            // 「@が1つ入っていて、その前後に文字があり、.も含まれている」という、簡易的なメールアドレスの形式チェックをしています。
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email =
                "@を含む正しいメールアドレスを入力してください。";
        }

        // お問い合わせ内容
        if (!formData.message.trim()) {
            newErrors.message = "お問い合わせ内容を入力してください。";
        } else if (formData.message.length > 200) {
            newErrors.message = "200文字以内で入力してください。";
        }

        setErrors(newErrors);


        // Object.keys(オブジェクト):そのオブジェクトが持っているプロパティ名(キー)を配列にして取り出すメソッド
        // newErrorsにエラーが1つもなければ、Object.keys(newErrors)は空配列[]になり、.length === 0がtrueになる → 「エラーなし」と判定される
        return Object.keys(newErrors).length === 0;
    };

    // handleSubmit:送信ボタンが押されたとき
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // フォーム送信時のページ再読み込みを止める
        e.preventDefault(); 

        // バリデーションがfalse(エラーあり)なら、そこで処理を止めて何もしない
        if (!validateForm()) {
            return;  // ← エラーがあれば、ここで処理が止まる
        }

        try {
            const response = await fetch("/api/contact",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error("メール送信に失敗しました。");
            } 

            console.log("送信成功：", result);

            setIsSubmitted(true);
            
        } catch (error) {
            console.error("送信エラー：", error);
        }

        // 問題なければ、今は仮にconsole.logで確認しているだけ(コメントにある通り、後でメール送信処理に差し替える予定)
        // console.log("送信データ:", formData);

        // バリデーション成功
        // setIsSubmitted(true);  // ← ここまで来たら成功
    };

    return (
        // <form>タグにonSubmitをつけることで、「送信ボタンが押されたとき」または「入力欄でEnterキーが押されたとき」の両方に対応できる
        // (FormButton側のonClickではなく、<form>側のonSubmitで受け止めているのがポイント)。
        <form className="contact-form" onSubmit={handleSubmit}>
            {isSubmitted ? (
                // trueなら → FormSuccess(成功画面)を表示
                <FormSuccess
                    onBack={() => setIsSubmitted(false)}
                />
            ) : (
                // falseなら → 入力フォーム一式を表示
                <div className="contact-form-fields">
                    {/* お名前 */}
                    <FormField
                        label="お名前"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="例：山本太郎"
                        error={errors.name}
                    />

                    {/* 会社名 */}
                    <FormField
                        label="会社名"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="例：株式会社〇〇"
                    />

                    {/* メールアドレス */}
                    <FormField
                        label="メールアドレス"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="例：form@form.com"
                        error={errors.email}
                    />

                    {/* お問い合わせ */}
                    <FormField
                        label="お問い合わせ内容"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        textarea
                        maxLength={200}
                        placeholder="200文字以内"
                        error={errors.message}
                    />

                    {/* 送信 Button */}
                    <FormButton type="submit">
                        送信
                    </FormButton>
                </div>
            )}
        </form>
    );
}
