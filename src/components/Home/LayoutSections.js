import React from "react";
import BannerCaption from "./BannerCaption/BannerCaption";
import Layout1 from "./Layout1/Layout1";
import Layout3 from "./Layout3/Layout3";
import Layout4 from "./Layout4/Layout4";
import Layout5 from "./Layout5/Layout5";
import SearchForm from "./SearchForm/SearchForm";

class LayoutSections extends React.Component {

    render() {
        const { layoutType, title, content, homeBannerImages, s, cx } = this.props;
        return (
            <>
                {layoutType == 1 && (
                    <Layout1
                        title={title}
                        content={content}
                        homeBannerImages={homeBannerImages}
                    />
                )}

                {layoutType == 3 && (
                    <Layout3
                        title={title}
                        content={content}
                        homeBannerImages={homeBannerImages}
                    />
                )}

                {layoutType == 4 && (
                    <Layout4
                        title={title}
                        content={content}
                        homeBannerImages={homeBannerImages}
                    />
                )}

                {layoutType == 5 && (
                    <Layout5
                        title={title}
                        content={content}
                        homeBannerImages={homeBannerImages}
                    />
                )}
                {layoutType == 2 && (
                    <div className={s.container}>
                        <div className={cx(s.pageContainer, s.layout2Bottom)}>
                            <BannerCaption title={title} content={content} />
                            <div className={s.pageContainer}>
                                <SearchForm />
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}
export default LayoutSections;