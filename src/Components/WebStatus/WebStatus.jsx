import { useState, useEffect } from "react"
import './WebStatus.css' 

export const WebStatus = () => {
    const [websites, setWebsites] = useState([
        { url: 'https://nuefang.com/', name: 'Nuefang'},
        { url: 'https://qualitybooksuk.com/', name: 'Quality Books UK'},
        { url: 'https://neverjusthair.com/', name: 'Never Just Hair'},
        { url: 'https://eyupben.org/', name: 'EyupBen'}, 
    ]);

    const mins = 1;

    useEffect(() => {
        const checkWebsiteStatus = async () => {
            const updatedWebsites = await Promise.all(
                websites.map(async (site) => {
                    console.log("whatever")
                    try {
                        const response = await fetch(site.url, {
                            method: 'HEAD',
                            mode: 'no-cors',
                          });
                        console.log(response);
                        return { ...site, url: site.url, status: true};
                    } catch (error) {
                      return { ...site, url: site.url, status: false}; 
                    }
                })
            );
            setWebsites(updatedWebsites);
        };

        const interval = setInterval(checkWebsiteStatus, mins*60*1000);
        checkWebsiteStatus();

        return () => clearInterval(interval);
    }, []);

    const openWebsite = (link) => {
        window.open(link, '_blank');
    };

    return (
        <>
            <section className="hero">
                <div className="container">
                    <table className="table">
                        <tr>
                            <th>WEBSITES</th>
                            <th>STATUS</th>
                        </tr>
                        {websites && websites.map((site, index) => (
                            <tr className="table-row" onClick={() => openWebsite(site.url)}> 
                                <td>{site.name}</td>
                                <td>{site?.status ? "Up" : "Down"}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </section>
        </>
    );
};

