// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request_post_request_one_of.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsRequestPostRequestOneOf extends TripsRequestPostRequestOneOf {
  @override
  final String? city;
  @override
  final num pickupLat;
  @override
  final num pickupLng;
  @override
  final num dropoffLat;
  @override
  final num dropoffLng;
  @override
  final num? distanceKm;
  @override
  final int? durationMin;
  @override
  final int? searchRadiusM;
  @override
  final int? locationMaxAgeMin;

  factory _$TripsRequestPostRequestOneOf(
          [void Function(TripsRequestPostRequestOneOfBuilder)? updates]) =>
      (TripsRequestPostRequestOneOfBuilder()..update(updates))._build();

  _$TripsRequestPostRequestOneOf._(
      {this.city,
      required this.pickupLat,
      required this.pickupLng,
      required this.dropoffLat,
      required this.dropoffLng,
      this.distanceKm,
      this.durationMin,
      this.searchRadiusM,
      this.locationMaxAgeMin})
      : super._();
  @override
  TripsRequestPostRequestOneOf rebuild(
          void Function(TripsRequestPostRequestOneOfBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequestPostRequestOneOfBuilder toBuilder() =>
      TripsRequestPostRequestOneOfBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequestPostRequestOneOf &&
        city == other.city &&
        pickupLat == other.pickupLat &&
        pickupLng == other.pickupLng &&
        dropoffLat == other.dropoffLat &&
        dropoffLng == other.dropoffLng &&
        distanceKm == other.distanceKm &&
        durationMin == other.durationMin &&
        searchRadiusM == other.searchRadiusM &&
        locationMaxAgeMin == other.locationMaxAgeMin;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, city.hashCode);
    _$hash = $jc(_$hash, pickupLat.hashCode);
    _$hash = $jc(_$hash, pickupLng.hashCode);
    _$hash = $jc(_$hash, dropoffLat.hashCode);
    _$hash = $jc(_$hash, dropoffLng.hashCode);
    _$hash = $jc(_$hash, distanceKm.hashCode);
    _$hash = $jc(_$hash, durationMin.hashCode);
    _$hash = $jc(_$hash, searchRadiusM.hashCode);
    _$hash = $jc(_$hash, locationMaxAgeMin.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsRequestPostRequestOneOf')
          ..add('city', city)
          ..add('pickupLat', pickupLat)
          ..add('pickupLng', pickupLng)
          ..add('dropoffLat', dropoffLat)
          ..add('dropoffLng', dropoffLng)
          ..add('distanceKm', distanceKm)
          ..add('durationMin', durationMin)
          ..add('searchRadiusM', searchRadiusM)
          ..add('locationMaxAgeMin', locationMaxAgeMin))
        .toString();
  }
}

class TripsRequestPostRequestOneOfBuilder
    implements
        Builder<TripsRequestPostRequestOneOf,
            TripsRequestPostRequestOneOfBuilder> {
  _$TripsRequestPostRequestOneOf? _$v;

  String? _city;
  String? get city => _$this._city;
  set city(String? city) => _$this._city = city;

  num? _pickupLat;
  num? get pickupLat => _$this._pickupLat;
  set pickupLat(num? pickupLat) => _$this._pickupLat = pickupLat;

  num? _pickupLng;
  num? get pickupLng => _$this._pickupLng;
  set pickupLng(num? pickupLng) => _$this._pickupLng = pickupLng;

  num? _dropoffLat;
  num? get dropoffLat => _$this._dropoffLat;
  set dropoffLat(num? dropoffLat) => _$this._dropoffLat = dropoffLat;

  num? _dropoffLng;
  num? get dropoffLng => _$this._dropoffLng;
  set dropoffLng(num? dropoffLng) => _$this._dropoffLng = dropoffLng;

  num? _distanceKm;
  num? get distanceKm => _$this._distanceKm;
  set distanceKm(num? distanceKm) => _$this._distanceKm = distanceKm;

  int? _durationMin;
  int? get durationMin => _$this._durationMin;
  set durationMin(int? durationMin) => _$this._durationMin = durationMin;

  int? _searchRadiusM;
  int? get searchRadiusM => _$this._searchRadiusM;
  set searchRadiusM(int? searchRadiusM) =>
      _$this._searchRadiusM = searchRadiusM;

  int? _locationMaxAgeMin;
  int? get locationMaxAgeMin => _$this._locationMaxAgeMin;
  set locationMaxAgeMin(int? locationMaxAgeMin) =>
      _$this._locationMaxAgeMin = locationMaxAgeMin;

  TripsRequestPostRequestOneOfBuilder() {
    TripsRequestPostRequestOneOf._defaults(this);
  }

  TripsRequestPostRequestOneOfBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _city = $v.city;
      _pickupLat = $v.pickupLat;
      _pickupLng = $v.pickupLng;
      _dropoffLat = $v.dropoffLat;
      _dropoffLng = $v.dropoffLng;
      _distanceKm = $v.distanceKm;
      _durationMin = $v.durationMin;
      _searchRadiusM = $v.searchRadiusM;
      _locationMaxAgeMin = $v.locationMaxAgeMin;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequestPostRequestOneOf other) {
    _$v = other as _$TripsRequestPostRequestOneOf;
  }

  @override
  void update(void Function(TripsRequestPostRequestOneOfBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequestPostRequestOneOf build() => _build();

  _$TripsRequestPostRequestOneOf _build() {
    final _$result = _$v ??
        _$TripsRequestPostRequestOneOf._(
          city: city,
          pickupLat: BuiltValueNullFieldError.checkNotNull(
              pickupLat, r'TripsRequestPostRequestOneOf', 'pickupLat'),
          pickupLng: BuiltValueNullFieldError.checkNotNull(
              pickupLng, r'TripsRequestPostRequestOneOf', 'pickupLng'),
          dropoffLat: BuiltValueNullFieldError.checkNotNull(
              dropoffLat, r'TripsRequestPostRequestOneOf', 'dropoffLat'),
          dropoffLng: BuiltValueNullFieldError.checkNotNull(
              dropoffLng, r'TripsRequestPostRequestOneOf', 'dropoffLng'),
          distanceKm: distanceKm,
          durationMin: durationMin,
          searchRadiusM: searchRadiusM,
          locationMaxAgeMin: locationMaxAgeMin,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
