export const useDeepEqualObject = () => {

    const deepEqualObject = (obj1: any, obj2: any) => {
        if (obj1 === obj2) return true;
  
        if (typeof obj1 !== 'object' || obj1 === null ||
            typeof obj2 !== 'object' || obj2 === null) {
            return obj1 === obj2;
        }
        
        if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
        
        if (Array.isArray(obj1)) {
            if (obj1.length !== obj2.length) return false;
            
            // Sort arrays and compare
            const sorted1 = [...obj1].sort();
            const sorted2 = [...obj2].sort();
            
            for (let i = 0; i < sorted1.length; i++) {
            if (!deepEqualObject(sorted1[i], sorted2[i])) return false;
            }
            
            return true;
        }
        
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        
        if (keys1.length !== keys2.length) return false;
        
        for (const key of keys1) {
            if (!keys2.includes(key)) return false;
            if (!deepEqualObject(obj1[key], obj2[key])) return false;
        }
        
        return true;

    }

    return {
        deepEqualObject
    }
}