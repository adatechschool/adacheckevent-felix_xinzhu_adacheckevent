import { Croissant } from 'lucide-react';
import { useState } from 'react';

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const sidebarClasses = [
        isOpen ? 'flex' : 'hidden',
        'sticky',
        'flex-col',
        'p-2.5',
        'pt-15',
        'top-0',
        'h-screen',
        'bg-[#354bcf]',
        'w-75',
        'gap-2'
    ].join(' ');

    const zipCode = [
        "75001", "75002", "75003", "75004", "75005", "75006", "75007", "75008", "75009", "75010", "75011", "75012", "75013", "75014", "75015", "75016", "75017", "75018", "75019", "75020"
    ];

    const tags = [
        'Art contemporain', 'Atelier', 'BD', 'Balade urbaine', 'Brocante', 'Cirque', 'Concert', 'Conférence', 'Danse', 'Ecrans', 'Enfants', 'Expo', 'Festival', 'Gourmand', 'Histoire', 'Humour', 'Innovation', 'LGBT', 'Littérature', 'Loisirs', 'Nature', 'Nuit', 'Peinture', 'Photo', 'Salon', 'Santé', 'Sciences', 'Solidarité', 'Spectacle musical', 'Sport', 'Street-art', 'Théâtre'
    ]

    console.log(isOpen);

    return (
        <>
            <div
                id="menuToggle"
                className="flex row fixed z-1 p-2.5 cursor-pointer bg-[#354bcf] rounded-br-[10px]"
                onClick={() => setIsOpen(!isOpen)}>
                <Croissant className="mr-2.5" />MENU</div>

            <div id="sideBar" className={sidebarClasses}>
                <h2>Arrondissements</h2>
                <div className="flex flex-row flex-wrap">
                    {zipCode.map((elem, id) => (
                        <span className="mr-2" key={id}>
                            <a href={`/tag/${elem}`}>
                                {elem}
                            </a>
                        </span>
                    ))}
                </div>
                <br />
                <h2>Tags</h2>
                <div className="flex flex-row flex-wrap">
                    {tags.map((elem, id) => (
                        <span className="mr-2" key={id}>
                            <a href={`/tag/${elem}`}>
                                {elem}
                            </a>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideMenu;