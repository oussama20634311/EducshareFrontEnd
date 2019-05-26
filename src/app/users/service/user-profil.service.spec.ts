import { TestBed } from '@angular/core/testing';

import { UserProfilService } from './user-profil.service';

describe('UserProfilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfilService = TestBed.get(UserProfilService);
    expect(service).toBeTruthy();
  });
});
