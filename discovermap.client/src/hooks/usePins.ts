import { useEffect, useState } from "react";
import { fetchPins } from "../services/pinService";
import type { Pin } from "../types/pin";

const usePins = () => {
    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPins()
            .then(setPins)
            .catch(() => setError("Failed to load pins."))
            .finally(() => setLoading(false));
    }, []);

    return { pins, loading, error };
};

export default usePins;