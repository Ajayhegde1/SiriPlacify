import Head from 'next/head'

export default function DocHeader({
    DocTitle
})
{
    return(
        <Head>
            <title>{DocTitle}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:title" content={DocTitle} key="title" />
        </Head>
    )
}
