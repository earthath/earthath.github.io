// Faulty Terminal Background Animation
class FaultyTerminal {
    constructor() {
        this.canvas = document.getElementById('terminal-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 30; // Increased cell size for fewer cells and better performance
        this.grid = [];
        this.symbols = ['█', '▓', '▒', '░', '+', '×', '•', '·', '■', '□', '▲', '△'];
        this.frameCount = 0;
        this.glitchRate = 0.005;
        
        this.resize();
        this.initGrid();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cols = Math.ceil(this.canvas.width / this.cellSize);
        this.rows = Math.ceil(this.canvas.height / this.cellSize);
        this.initGrid();
    }

    initGrid() {
        this.grid = [];
        for (let y = 0; y < this.rows; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                const isActive = Math.random() > 0.65;
                this.grid[y][x] = {
                    active: isActive,
                    symbol: this.symbols[Math.floor(Math.random() * this.symbols.length)],
                    brightness: 0.2 + Math.random() * 0.8,
                    pulse: Math.random() * Math.PI * 2,
                    speed: 0.015 + Math.random() * 0.025,
                    flickerRate: 0.005 + Math.random() * 0.015,
                    lastToggle: 0,
                };
            }
        }
    }

    animate() {
        this.frameCount++;
        
        // Only render every other frame for better performance
        if (this.frameCount % 2 !== 0) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        
        // Clear canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Batch operations
        this.ctx.font = `${this.cellSize * 0.75}px 'Courier New', monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Draw grid with glitch effects - optimized
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const cell = this.grid[y][x];
                
                // Update pulse animation
                cell.pulse += cell.speed;
                
                // Random flickering (faulty terminal effect) - reduced frequency
                if (Math.random() < cell.flickerRate * 0.5) {
                    cell.active = !cell.active;
                    cell.lastToggle = this.frameCount;
                }
                
                // Change symbol occasionally (glitch effect) - reduced frequency
                if (Math.random() < 0.004) {
                    cell.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                }
                
                // Brightness variation after toggle
                if (this.frameCount - cell.lastToggle < 5) {
                    cell.brightness = 0.8 + Math.random() * 0.2;
                }
                
                if (cell.active) {
                    // Calculate brightness with pulse
                    const pulseBrightness = Math.sin(cell.pulse) * 0.2 + 0.8;
                    const alpha = cell.brightness * pulseBrightness;
                    
                    const px = x * this.cellSize + this.cellSize / 2;
                    const py = y * this.cellSize + this.cellSize / 2;
                    
                    // Simplified drawing - only draw visible cells
                    this.ctx.fillStyle = `rgba(76, 175, 80, ${alpha * 0.7})`;
                    this.ctx.fillText(cell.symbol, px, py);
                }
            }
        }

        // Occasional full-screen glitch effect - reduced frequency
        if (Math.random() < 0.0015) {
            this.applyGlitch();
        }

        requestAnimationFrame(() => this.animate());
    }
    
    applyGlitch() {
        // Random horizontal lines glitch
        for (let i = 0; i < 3; i++) {
            const y = Math.random() * this.canvas.height;
            const height = 1 + Math.random() * 3;
            this.ctx.fillStyle = `rgba(76, 175, 80, ${0.3 + Math.random() * 0.4})`;
            this.ctx.fillRect(0, y, this.canvas.width, height);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FaultyTerminal();
    });
} else {
    new FaultyTerminal();
}

