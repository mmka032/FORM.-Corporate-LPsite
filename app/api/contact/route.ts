// route.tsは「画面を持たない、データだけを返す窓口(API)」を作るファイル

import { Resend } from "resend";

// Resend:メール送信サービス「Resend」が提供しているライブラリ
// new Resend(...):クラスからインスタンス(実際に使える形)を作っている書き方。
// process.env.RESEND_API_KEYで、.env.localに書いたAPIキーを読み込んで、Resendに「これが自分のアカウントですよ」と伝えている
const resend = new Resend(process.env.RESEND_API_KEY);

// ここがApp Routerの決まりごと。
// route.tsの中でGET、POSTのようなHTTPメソッド名と同じ名前の関数をexportすると、Next.js側がそれを自動的に「このメソッドが来たときの処理」として認識してくれる。
// 今回はフォーム送信(POST)を受け取る用なのでPOSTという名前にしている。
// asyncがついているのは、この中でメールの送信(時間がかかる処理)をawaitで待つ必要があるため。
export async function POST(request: Request) {
    // 「実行してみて、もしエラーが起きたら、プログラム全体を止めずにcatchの中の処理に切り替える」という仕組み
    // メール送信は、ネットワークの状況などによって失敗する可能性がある処理。
    // tryで囲んでおくことで、失敗しても安全に処理を続けられるようにしている。
    try {
        // リクエストの中身を取り出す
        // フロント側(ContactForm.tsx)から送られてきたデータを、JSON形式からJSのオブジェクトに変換して取り出す（分割代入）
        const body = await request.json();

        console.log("受信データ", body);

        // bodyというオブジェクトから、4つのプロパティを一気に取り出している
        const { name, company, email, message } = body;

        // メール送信（受け取る側）
        // resend.emails.send({...}):Resendが用意している「メールを送る」メソッド。
        // awaitがついているのは、送信が完了するまで待つ必要があるため
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "m.momoka0032@gmail.com",
            subject: `【お問い合わせ】${name}様`,

            // text の中の` (バッククォート)はテンプレートリテラル。
            // ${name}のように${}の中に変数を埋め込んで、1つの文字列を組み立てている
            html: `
                <div style="
                    margin: 0;
                    padding: 40px 20px;
                    background-color: #111111;
                    font-family: Arial, sans-serif;
                    color: #b8b8b5;
                ">
                    <div style="
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 40px;
                        background-color: #2a2a2a;
                    ">

                        <!-- Title -->
                        <h1 style="
                            margin: 0 0 48px;
                            padding: 0;
                            font-size: 24px;
                            font-weight: 500;
                            letter-spacing: 0.1em;
                            color: #f7f6f2;
                            text-align: left;
                        ">
                            CONTACT
                        </h1>


                        <!-- お名前 -->
                        <div style="
                            padding: 0 0 24px;
                            margin: 0 0 24px;
                            border-bottom: 1px solid #b8b8b5;
                        ">
                            <p style="
                                margin: 0 0 8px;
                                padding: 0;
                                font-size: 12px;
                                font-weight: 500;
                                letter-spacing: 0.1em;
                                color: #a99162;
                                text-align: left;
                            ">
                                お名前
                            </p>

                            <p style="
                                margin: 0;
                                padding: 0;
                                font-size: 16px;
                                font-weight: 500;
                                color: #f7f6f2;
                                text-align: left;
                            ">
                                ${name}
                            </p>
                        </div>


                        <!-- 会社名 -->
                        <div style="
                            padding: 0 0 24px;
                            margin: 0 0 24px;
                            border-bottom: 1px solid #b8b8b5;
                        ">
                            <p style="
                                margin: 0 0 8px;
                                padding: 0;
                                font-size: 12px;
                                font-weight: 500;
                                letter-spacing: 0.1em;
                                color: #a99162;
                                text-align: left;
                            ">
                                会社名
                            </p>

                            <p style="
                                margin: 0;
                                padding: 0;
                                font-size: 16px;
                                font-weight: 500;
                                color: #f7f6f2;
                                text-align: left;
                            ">
                                ${company || "未入力"}
                            </p>
                        </div>


                        <!-- メールアドレス -->
                        <div style="
                            padding: 0 0 24px;
                            margin: 0 0 24px;
                            border-bottom: 1px solid #b8b8b5;
                        ">
                            <p style="
                                margin: 0 0 8px;
                                padding: 0;
                                font-size: 12px;
                                font-weight: 500;
                                letter-spacing: 0.1em;
                                color: #a99162;
                                text-align: left;
                            ">
                                メールアドレス
                            </p>

                            <p style="
                                margin: 0;
                                padding: 0;
                                font-size: 16px;
                                font-weight: 500;
                                color: #f7f6f2;
                                text-align: left;
                            ">
                                ${email}
                            </p>
                        </div>


                        <!-- お問い合わせ内容 -->
                        <div style="
                            padding: 0 0 24px;
                            margin: 0 0 32px;
                            border-bottom: 1px solid #b8b8b5;
                        ">
                            <p style="
                                margin: 0 0 8px;
                                padding: 0;
                                font-size: 12px;
                                font-weight: 500;
                                letter-spacing: 0.1em;
                                color: #a99162;
                                text-align: left;
                            ">
                                お問い合わせ内容
                            </p>

                            <p style="
                                margin: 0;
                                padding: 0;
                                font-size: 15px;
                                font-weight: 500;
                                line-height: 1.8;
                                color: #f7f6f2;
                                text-align: left;
                                white-space: pre-wrap;
                                word-break: break-word;
                            ">${message}</p>
                        </div>


                        <!-- Footer -->
                        <p style="
                            margin: 0;
                            padding: 0;
                            font-size: 11px;
                            font-weight: 500;
                            line-height: 1.6;
                            color: #b8b8b5;
                            text-align: left;
                        ">
                            このメールはWebサイトのお問い合わせフォームから自動送信されています。
                        </p>

                    </div>
                </div>
                `,
        });

        // 送信した側（お問い合わせメール）
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "お問い合わせありがとうございます",
            
            html: `
                <div style="
                    margin: 0;
                    padding: 40px 20px;
                    background-color: #111111;
                    font-family: Arial, sans-serif;
                    color: #b8b8b5;
                ">
                    <div style="
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 40px;
                        background-color: #2a2a2a;
                    ">

                        <h1 style="
                            margin: 0 0 48px;
                            font-size: 24px;
                            font-weight: 500;
                            letter-spacing: 0.1em;
                            color: #f7f6f2;
                        ">
                            FORM.
                        </h1>

                        <h2 style="
                            margin: 0 0 32px;
                            font-size: 20px;
                            font-weight: 500;
                            letter-spacing: 0.1em;
                            color: #a99162;
                        ">
                            THANK YOU
                        </h2>

                        <p style="
                            margin: 0 0 24px;
                            font-size: 16px;
                            font-weight: 500;
                            line-height: 1.8;
                            color: #f7f6f2;
                        ">
                            お問い合わせありがとうございます。
                        </p>

                        <p style="
                            margin: 0;
                            font-size: 14px;
                            font-weight: 500;
                            line-height: 2;
                            color: #b8b8b5;
                            word-break: keep-all;
                        ">
                            ${name} 様<br>
                            この度はお問い合わせいただき、ありがとうございます。<br>
                            内容を確認の上、担当者よりご連絡いたします。
                        </p>

                        <div style="
                            margin: 40px 0;
                            border-top: 1px solid rgba(184, 184, 181, 0.25);
                        "></div>

                        <p style="
                            margin: 0;
                            font-size: 11px;
                            font-weight: 500;
                            line-height: 1.6;
                            color: #b8b8b5;
                        ">
                            このメールはWebサイトのお問い合わせフォームから自動送信されています。
                        </p>

                    </div>
                </div>
            `,
        });

        return Response.json({
            success: true,
        });
        // うまくいくかもしれない処理
    } catch (error) {
        // 失敗したときの処理
        console.error("メール送信エラー：", error);

        // レスポンスを返す
        // Response.json(データ, オプション)という形で、第2引数にステータスコードなどを追加で指定できる、という書き方。
        return Response.json(
            {
                // 成功したとき → { success: true }というJSONを返す
                // 失敗したときは、catchの中で{ success: false, message: "..." }を、HTTPステータスコード500(サーバー側のエラーを意味する番号)付きで返している
                success: false,
                message: "メールの送信に失敗しました。",
            },
            {
                status: 500,
            }
        )
    }
};
