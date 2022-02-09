class Opacy {
    constructor(selector) {
        this.target = document.querySelectorAll(selector)

        let options = { threshold: [0.5] }
        let observer = new IntersectionObserver(this.onEntry.bind(this), options)


        for (const elem of this.target) {
            observer.observe(elem)
        }
    }

    onEntry(entry) {
        entry.forEach(change => {
            const scrollHandle = this.handler(change.target)
    
            if (change.isIntersecting) {
                document.addEventListener('scroll', scrollHandle)
            } else {
                document.removeEventListener('scroll', scrollHandle)
            }
        })
    }

    handler(target) {
        return () => {
            const rect = target.getBoundingClientRect()
        
            const percent = this.getPercent(rect.y + rect.height / 2, innerHeight / 2)
            
            target.style.opacity = Math.abs((percent - 100) / 100)
        }
    }

    getPercent(current, total) {
        let pos = 0
    
        if (current < total) {
            pos = total - current
        } else {
            pos = Math.abs(innerHeight - current - total)
        }
    
        return (pos / total) * 100
    }
}

new Opacy('.box')