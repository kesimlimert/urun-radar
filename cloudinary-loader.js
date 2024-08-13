export default function cloudinaryLoader(config) {
    // for image check
    if(!config.src.includes('https')) {
        return config.src;
    }
    const urlStart = config.src.split('upload/')[0];
    const urlEnd = config.src.split('upload/')[1];
    const transformations = `w_200,q_${config.quality}`;
    return `${urlStart}upload/${transformations}/${urlEnd}`;
}