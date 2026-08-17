// about・Contact 共通見出しコンポーネント

type SectionHeadingProps = {
    en: string; // 英語見出し
    ja: string; // 日本語見出し

    // スマホは横幅が狭く、ブラウザの自動改行に任せると文の意味の区切りと
    // 違う場所で折り返されてしまうため、改行位置を手動で指定したいときだけ渡すオブジェクト
    jaSp?: {
        first: string;
        second: string;
    };
};

export default function SectionHeading({
    en,
    ja,
    jaSp,
}: SectionHeadingProps) {
    return (
        <h2 className="section-heading">
            <span className="heading-en">
                {en}
            </span>

            <span className="heading-ja">
                {jaSp ? (
                    <>
                        {/* スマホではfirst+改行+second(md:hidden＝画面が広いときは隠す) */}
                        <span className="md:hidden">
                            {jaSp.first} {/* 例：美しいだけでは、 */}
                            <br />
                            {jaSp.second} {/* 例：終わらせない。 */}
                        </span>

                        {/* PCではjaをそのまま(hidden md:inline＝画面が広いときだけ表示) */}
                        <span className="hidden md:inline">
                            {ja}
                        </span>
                    </>
                ) : (
                    // jaSpが渡されていなければ → シンプルにjaだけ表示
                    ja
                )}
            </span>
        </h2>
    );
}