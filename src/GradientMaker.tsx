import { useState } from 'react';

export default function GradientGenerator() {
    const [gradientType, setGradientType] = useState('linear');
    const [angle, setAngle] = useState(90);
    const [colorStops, setColorStops] = useState(['#ff0000', '#0000ff']);

    const handleAddColorStop = () => {
        setColorStops([...colorStops, '#ffffff']);
    };

    const handleColorChange = (index: number, newColor: string) => {
        const updatedStops = [...colorStops];
        updatedStops[index] = newColor;
        setColorStops(updatedStops);
    };

    const handleRemoveColorStop = (index: number) => {
        const updatedStops = [...colorStops];
        updatedStops.splice(index, 1);
        setColorStops(updatedStops);
    };

    // Build the gradient string
    let gradientCSS = '';

    if (gradientType === 'linear') {
        // linear-gradient(angle, color1, color2, ...)
        gradientCSS = `linear-gradient(${angle}deg, ${colorStops.join(', ')})`;
    } else if (gradientType === 'radial') {
        // radial-gradient(color1, color2, ...)
        gradientCSS = `radial-gradient(${colorStops.join(', ')})`;
    } else {
        // conic-gradient(from angle, color1, color2, ...)
        gradientCSS = `conic-gradient(from ${angle}deg, ${colorStops.join(', ')})`;
    }

    return (
        <div className="min-h-screen p-4 flex flex-col gap-4 items-center bg-gray-50">
            <h1 className="text-xl font-bold">CSS Gradient Generator</h1>

            {/* Controls */}
            <div className="w-full max-w-md bg-white shadow p-4 rounded-2xl space-y-4">
                <div>
                    <label className="block mb-2 font-semibold">Gradient Type</label>
                    <select
                        className="border rounded p-2 w-full"
                        value={gradientType}
                        onChange={(e) => setGradientType(e.target.value)}
                    >
                        <option value="linear">Linear</option>
                        <option value="radial">Radial</option>
                        <option value="conic">Conic</option>
                    </select>
                </div>

                {/* Angle only makes sense for linear & conic */}
                {(gradientType === 'linear' || gradientType === 'conic') && (
                    <div>
                        <label className="block mb-2 font-semibold">Angle (degrees)</label>
                        <input
                            type="number"
                            className="border rounded p-2 w-full"
                            value={angle}
                            onChange={(e) => setAngle(Number(e.target.value))}
                        />
                    </div>
                )}

                <div>
                    <label className="block mb-2 font-semibold">Color Stops</label>
                    {colorStops.map((color, index) => (
                        <div key={index} className="flex items-center mb-2 gap-2">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => handleColorChange(index, e.target.value)}
                                className="w-10 h-10 p-0 border-0"
                            />
                            <input
                                type="text"
                                className="border rounded p-2 w-full"
                                value={color}
                                onChange={(e) => handleColorChange(index, e.target.value)}
                            />
                            {colorStops.length > 1 && (
                                <button
                                    onClick={() => handleRemoveColorStop(index)}
                                    className="border rounded p-2"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={handleAddColorStop}
                        className="bg-gray-100 border rounded p-2 mt-2"
                    >
                        + Add Color Stop
                    </button>
                </div>
            </div>

            {/* Preview and code */}
            <div className="w-full max-w-md bg-white shadow p-4 rounded-2xl space-y-4">
                <div className="font-semibold">Preview</div>
                <div
                    className="w-full h-32 rounded-xl"
                    style={{ background: gradientCSS }}
                />

                <div>
                    <div className="font-semibold mb-2">CSS Code</div>
                    <pre className="bg-gray-100 p-2 rounded-xl whitespace-pre-wrap">
                        {`background: ${gradientCSS};`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
