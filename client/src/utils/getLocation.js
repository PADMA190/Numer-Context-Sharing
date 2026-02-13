const getCityName = async () => {
  if (!navigator.geolocation) return null;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await res.json();

          resolve(
            data.address.city ||
            data.address.town ||
            data.address.state ||
            null
          );
        } catch {
          resolve(null);
        }
      },
      () => resolve(null)
    );
  });
};

export default getCityName;