import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ExplorerService } from '../explorer.service';

@Component({
  selector: 'app-anchor-navigation',
  templateUrl: './anchor-navigation.component.html',
  styleUrls: ['./anchor-navigation.component.scss'],
})
export class AnchorNavigationComponent implements AfterViewInit {
  @Input() identifier = '';

  @ViewChild('section') section: ElementRef | undefined;

  constructor(private explorerService: ExplorerService, private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer2.listen('window', 'wheel', this.detectFormSections.bind(this));
    this.renderer2.listen('window', 'resize', this.detectFormSections.bind(this));

    this.explorerService.gotoObs.subscribe((obs) => {
      if (this.section?.nativeElement.id === obs) {
        this.section.nativeElement.scrollIntoView();
        this.explorerService.setFormTreeActive(obs);
      }
    });
  }

  private detectFormSections() {
    const detectedSections: Array<string> = [];
    if (this.isInViewport(this.section?.nativeElement)) {
      detectedSections.push(this.section?.nativeElement.id);
    }
    if (detectedSections[0] !== undefined) {
      this.explorerService.setFormTreeActive(detectedSections[detectedSections.length - 1]);
    }
  }

  private isInViewport(section: HTMLElement) {
    const bound = section.getBoundingClientRect();
    const elementTop = bound.top;

    return elementTop > window.innerHeight / 6 && elementTop < window.innerHeight / 3;
  }
}
