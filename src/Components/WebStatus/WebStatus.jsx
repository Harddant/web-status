import { useState, useEffect } from "react"
import './WebStatus.css' 

export const WebStatus = () => {
    const [websites, setWebsites] = useState([
        { url: 'https://nuefang.com/' },
        { url: 'https://qualitybooksuk.com/'},
        { url: 'https://neverjusthair.com/'},
        { url: 'https://eyupben.org/'},
        { url: 'https://neeeufang.com/'}  
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
                        return { url: site.url, status: true};
                    } catch (error) {
                      return { url: site.url, status: false}; 
                    }
                })
            );
            setWebsites(updatedWebsites);
        };

        const interval = setInterval(checkWebsiteStatus, mins*60*1000);
        checkWebsiteStatus();

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section className="hero">
                <div className="container">
                    <table>
                        <tr>
                            <th>URL</th>
                            <th>STATUS</th>
                        </tr>
                        {websites && websites.map((site, index) => (
                            <tr>
                                <td>{site.url}</td>
                                <td>{site?.status ? "Up" : "Down"}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </section>
        </>
    );
};

