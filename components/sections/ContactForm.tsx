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
        if (!formData.name.trim()) {
            newErrors.name = "お名前を入力してください。";
        }

        // メールアドレス
        if (!formData.email.trim()) {
            newErrors.email = "メールアドレスを入力してください。";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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

        return Object.keys(newErrors).length === 0;
    };

    // handleSubmit:送信ボタンが押されたとき
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // フォーム送信時のページ再読み込みを止める
        e.preventDefault(); 

        // バリデーションNGならここで処理を止める
        if (!validateForm()) {
            return;
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
    };

    return (
        // onSubmitで受けることで、送信ボタンのクリックとEnterキー送信の両方に対応できる
        <form
            // w-full max-w-[342px]：342pxは固定ではなく上限。
            // .innerコンテナは100vw-48pxのため、390px未満の画面幅では342pxが入りきらずはみ出す。
            // 上限指定にすることで、狭い画面でも自動的に縮んで中央に収まるようにしている
            className="
                    relative w-full max-w-85.5 min-h-154.75 py-7 px-8 box-border bg-form-bg
                    flex flex-col items-center md:max-w-137.5 md:w-137.5 md:min-h-193.5 md:py-12 md:px-10"
            onSubmit={handleSubmit}
            // noValidate：required/aria-requiredはスクリーンリーダー向けの情報として残しつつ、
            // ブラウザ標準のバリデーションUIは無効化し、validateForm()の日本語エラーメッセージだけを表示させる
            noValidate
        >
            {isSubmitted ? (
                <FormSuccess
                    onBack={() => setIsSubmitted(false)}
                />
            ) : (
                <div className="w-full flex flex-col gap-7 md:gap-8">
                    {/* お名前 */}
                    <FormField
                        label="お名前"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="例：山本太郎"
                        error={errors.name}
                        autoComplete="name"
                    />

                    {/* 会社名 */}
                    <FormField
                        label="会社名"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="例：株式会社〇〇"
                        autoComplete="organization"
                    />

                    {/* メールアドレス */}
                    <FormField
                        label="メールアドレス"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="例：form@form.com"
                        error={errors.email}
                        autoComplete="email"
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
