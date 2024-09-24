import { useState, useEffect } from "react"
import './WebStatus.css' 

export const WebStatus = () => {
    const [websites, setWebsites] = useState([
        { url: 'https://nuefang.com/' },
        { url: 'https://qualitybooksuk.com/'},
        { url: 'https://neverjusthair.com/'},
        { url: 'https://eyupben.org/'}  
    ]);

    useEffect(() => {
        const checkWebsiteStatus = async () => {
            const updatedWebsites = await Promise.all(
                websites.map(async (site) => {
                    try {
                        const response = await fetch(site.url);
                        return { url: site.url, status: response.ok ? 'up' : 'down' };
                    } catch (error) {
                      return { url: site.url, status: 'down' }; 
                    }
                })
            );
            setWebsites(updatedWebsites);
        };

        const interval = setInterval(checkWebsiteStatus, 60000);
        checkWebsiteStatus();

        return () => clearInterval(interval);
    }, [websites]);

    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1 className="website-name">Websites</h1>
                    <h2 className="status-checker">Status</h2>
                    <h2 className="uptime">Uptime</h2>
                </div>
            </section>
        </>
    );
};

