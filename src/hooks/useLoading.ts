import { useEffect, useState } from 'react';

export default function useLoading() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      }, [loading]);

      return {
        loading,
        setLoading,
      };
}
