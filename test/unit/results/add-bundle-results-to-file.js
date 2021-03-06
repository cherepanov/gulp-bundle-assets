var libPath = './../../../lib',
  addBundleResults = require(libPath + '/results/add-bundle-results-to-file'),
  BundleType = require(libPath + '/model/bundle-type'),
  should = require('should'),
  File = require('vinyl');

describe('add-bundle-results-to-file', function () {

  it('should append bundle info to file', function (done) {

    var fakeFile = new File({
      path: '/fake/file/path',
      contents: new Buffer('')
    });

    var abrs = addBundleResults('main', BundleType.SCRIPTS, null, 'production', true);

    abrs.write(fakeFile);

    abrs.once('data', function(file) {
      file.isBuffer().should.be.true;

      file.contents.toString('utf8').should.eql('');
      file.bundle.should.be.ok;
      file.bundle.name.should.eql('main');
      file.bundle.type.should.eql(BundleType.SCRIPTS);
      file.bundle.result.type.should.eql('html');
      file.bundle.env.should.eql('production');
      file.bundle.bundleAllEnvironments.should.eql(true);
      done();
    });

  });

  it('should append bundle info to file with custom result type', function (done) {

    var fakeFile = new File({
      path: '/fake/file/path',
      contents: new Buffer('')
    });

    var abrs = addBundleResults('base', BundleType.SCRIPTS, { type: 'jsx' }, '', false);

    abrs.write(fakeFile);

    abrs.once('data', function(file) {
      file.isBuffer().should.be.true;

      file.contents.toString('utf8').should.eql('');
      file.bundle.should.be.ok;
      file.bundle.name.should.eql('base');
      file.bundle.type.should.eql(BundleType.SCRIPTS);
      file.bundle.result.type.should.eql('jsx');
      file.bundle.env.should.eql('');
      file.bundle.bundleAllEnvironments.should.eql(false);
      done();
    });

  });

});
