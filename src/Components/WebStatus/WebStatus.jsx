import { useState, useEffect } from "react"
import './WebStatus.css' 
import { WebCard } from './WebCard'

export const WebStatus = () => {
    const [websites, setWebsites] = useState([
        { url: 'https://nuefang.com/', name: 'Nuefang'},
        { url: 'https://qualitybooksuk.com/', name: 'Quality Books UK'},
        { url: 'https://neverjusthair.com/', name: 'Never Just Hair'},
        { url: 'https://eyupben.org/', name: 'Ey Up Ben'}, 
    ]);

    const mins = 1;

    useEffect(() => {
        const checkWebsiteStatus = async () => {
            const updatedWebsites = await Promise.all(
                websites.map(async (site) => {
                    try {
                        const response = await fetch(site.url + 'api/health', {
                            method: 'GET',
                          }).then(response => response.json());
                        return { ...site, url: site.url, status: true, uptime: response.uptime};
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
                <h1 className="title">Status Checker</h1>
                <div className="grid-container">
                    {websites.map((site, index) => (
                        <WebCard website={site} />
                    ))}
                </div>
            </section>
        </>
    );
};

