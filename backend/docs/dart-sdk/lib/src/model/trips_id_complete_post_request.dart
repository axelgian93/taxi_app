//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_id_complete_post_request.g.dart';

/// TripsIdCompletePostRequest
///
/// Properties:
/// * [method] 
/// * [paymentMethodId] 
@BuiltValue()
abstract class TripsIdCompletePostRequest implements Built<TripsIdCompletePostRequest, TripsIdCompletePostRequestBuilder> {
  @BuiltValueField(wireName: r'method')
  TripsIdCompletePostRequestMethodEnum? get method;
  // enum methodEnum {  CASH,  CARD,  TRANSFER,  };

  @BuiltValueField(wireName: r'paymentMethodId')
  String? get paymentMethodId;

  TripsIdCompletePostRequest._();

  factory TripsIdCompletePostRequest([void updates(TripsIdCompletePostRequestBuilder b)]) = _$TripsIdCompletePostRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsIdCompletePostRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsIdCompletePostRequest> get serializer => _$TripsIdCompletePostRequestSerializer();
}

class _$TripsIdCompletePostRequestSerializer implements PrimitiveSerializer<TripsIdCompletePostRequest> {
  @override
  final Iterable<Type> types = const [TripsIdCompletePostRequest, _$TripsIdCompletePostRequest];

  @override
  final String wireName = r'TripsIdCompletePostRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsIdCompletePostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.method != null) {
      yield r'method';
      yield serializers.serialize(
        object.method,
        specifiedType: const FullType(TripsIdCompletePostRequestMethodEnum),
      );
    }
    if (object.paymentMethodId != null) {
      yield r'paymentMethodId';
      yield serializers.serialize(
        object.paymentMethodId,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsIdCompletePostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsIdCompletePostRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(TripsIdCompletePostRequestMethodEnum),
          ) as TripsIdCompletePostRequestMethodEnum;
          result.method = valueDes;
          break;
        case r'paymentMethodId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.paymentMethodId = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsIdCompletePostRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsIdCompletePostRequestBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class TripsIdCompletePostRequestMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'CASH')
  static const TripsIdCompletePostRequestMethodEnum CASH = _$tripsIdCompletePostRequestMethodEnum_CASH;
  @BuiltValueEnumConst(wireName: r'CARD')
  static const TripsIdCompletePostRequestMethodEnum CARD = _$tripsIdCompletePostRequestMethodEnum_CARD;
  @BuiltValueEnumConst(wireName: r'TRANSFER')
  static const TripsIdCompletePostRequestMethodEnum TRANSFER = _$tripsIdCompletePostRequestMethodEnum_TRANSFER;

  static Serializer<TripsIdCompletePostRequestMethodEnum> get serializer => _$tripsIdCompletePostRequestMethodEnumSerializer;

  const TripsIdCompletePostRequestMethodEnum._(String name): super(name);

  static BuiltSet<TripsIdCompletePostRequestMethodEnum> get values => _$tripsIdCompletePostRequestMethodEnumValues;
  static TripsIdCompletePostRequestMethodEnum valueOf(String name) => _$tripsIdCompletePostRequestMethodEnumValueOf(name);
}

