export const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
  };
  
 export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = Uint8Array.from(atob(hash), (c) => c.charCodeAt(0));
    const hashDigest = await crypto.subtle.digest('SHA-256', data);
    const hashArray = new Uint8Array(hashDigest);
    const isValid = hashBuffer.length === hashArray.length && hashBuffer.every((value, index) => value === hashArray[index]);
    return isValid;
  };