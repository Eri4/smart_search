interface Combination {
    city?: {
        id: number;
        name: string;
    };
    brand?: {
        id: number;
        name: string;
    };
    dishType?: {
        id: number;
        name: string;
    };
    diet?: {
        id: number;
        name: string;
    };
}

interface CombinationListProps {
    combinations: Combination[];
}

function CombinationList({ combinations }: CombinationListProps) {
    return (
        <div>
            <h2>Combinations:</h2>
            {combinations.map((combination, index) => (
                <div key={index}>
                    <h3>Combination {index + 1}</h3>
                    <ul>
                        {combination.city && (
                            <li>
                                City: {combination.city.name} (ID: {combination.city.id})
                            </li>
                        )}
                        {combination.brand && (
                            <li>
                                Brand: {combination.brand.name} (ID: {combination.brand.id})
                            </li>
                        )}
                        {combination.dishType && (
                            <li>
                                Dish Type: {combination.dishType.name} (ID: {combination.dishType.id})
                            </li>
                        )}
                        {combination.diet && (
                            <li>
                                Diet: {combination.diet.name} (ID: {combination.diet.id})
                            </li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default CombinationList;