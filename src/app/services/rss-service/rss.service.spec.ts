/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RssService } from './rss.service';

describe('Service: Rss', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RssService]
    });
  });

  it('should ...', inject([RssService], (service: RssService) => {
    expect(service).toBeTruthy();
  }));
});
